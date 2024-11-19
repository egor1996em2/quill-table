import Quill from 'quill';
import TableColumnTool from './modules/table-column-tool';
import TableSelection from './modules/table-selection';
import TableOperationMenu from './modules/table-operation-menu';

// import table node matchers
import {matchTable, matchTableCell, matchTableHeader} from './utils/node-matchers';

import {getEventComposedPath} from './utils/index';
import {
    cellId,
    rowId,
    TableBody,
    TableCell,
    TableCellLine,
    TableCol,
    TableColGroup,
    TableContainer,
    TableRow,
    TableViewWrapper,
} from './formats/table';
import {getColToolCellIndexByBoundary, getColToolCellIndexesByBoundary} from 'src/utils/table-util';
import {ERROR_LIMIT} from 'src/contants';

const Module = Quill.import('core/module');
const Delta = Quill.import('delta');

class QuillTable extends Module {
    static register() {
        Quill.register(TableCol, true);
        Quill.register(TableColGroup, true);
        Quill.register(TableCellLine, true);
        Quill.register(TableCell, true);
        Quill.register(TableRow, true);
        Quill.register(TableBody, true);
        Quill.register(TableContainer, true);
        Quill.register(TableViewWrapper, true);
        // register customized Header，overwriting quill built-in Header
        // Quill.register('formats/header', Header, true);
    }

    constructor(quill, options) {
        super(quill, options);

        // handle click on quill-table__table
        this.quill.root.addEventListener(
            'click',
            evt => {
                // bugfix: evt.path is undefined in Safari, FF, Micro Edge
                const path = getEventComposedPath(evt);
                if (!path || path.length <= 0) return;

                const {tableNode, rowNode, cellNode} = path.reduce(
                    (acc, node) => {
                        if (!node.tagName) {
                            return acc;
                        }

                        const tagName = node.tagName.toUpperCase();

                        if (tagName === 'TABLE' && node.classList.contains('quill-table__table')) {
                            acc.tableNode = node;
                            return acc;
                        }

                        if (tagName === 'TR') {
                            acc.rowNode = node;
                        }

                        // if multi columns selected
                        if ((tagName === 'TBODY' || acc.rowNode) && !acc.cellNode) {
                            const pointerElement = document.elementFromPoint(evt.x, evt.y);
                            if (pointerElement) {
                                acc.cellNode = pointerElement.closest('.quill-table__cell');
                            }
                        }

                        if (node.classList.contains('quill-table__cell')) {
                            acc.cellNode = node;
                        }

                        return acc;
                    },
                    {cellNode: null, rowNode: null, tableNode: null}
                );

                if (tableNode) {
                    // current table clicked
                    if (this.table === tableNode) return;
                    // other table clicked
                    if (this.table) this.hideTableTools();
                    this.showTableTools(tableNode, rowNode, cellNode, quill, options);
                } else if (this.table) {
                    // other clicked
                    this.hideTableTools();
                }
            },
            false
        );

        // handle right click on quill-table__table
        this.quill.root.addEventListener(
            'contextmenu',
            evt => {
                if (!this.table) return true;
                evt.preventDefault();

                // bugfix: evt.path is undefined in Safari, FF, Micro Edge
                const path = getEventComposedPath(evt);
                if (!path || path.length <= 0) return;

                const tableNode = path.filter(node => {
                    return (
                        node.tagName &&
                        node.tagName.toUpperCase() === 'TABLE' &&
                        node.classList.contains('quill-table__table')
                    );
                })[0];

                const rowNode = path.filter(node => {
                    return node.tagName && node.tagName.toUpperCase() === 'TR' && node.getAttribute('data-row');
                })[0];

                const cellNode = path.filter(node => {
                    return node.tagName && node.tagName.toUpperCase() === 'TD' && node.getAttribute('data-row');
                })[0];

                let isTargetCellSelected = this.tableSelection.selectedTds
                    .map(tableCell => tableCell.domNode)
                    .includes(cellNode);

                if (this.tableSelection.selectedTds.length <= 0 || !isTargetCellSelected) {
                    this.tableSelection.setSelection(cellNode, cellNode);
                }

                this.showTableOperationMenu(tableNode, rowNode, cellNode, evt);
            },
            false
        );

        // add keyboard binding：Backspace
        // prevent user hits backspace to delete table cell
        // const KeyBoard = quill.getModule('keyboard');
        quill.keyboard.addBinding({key: 'Backspace'}, {}, (range, context) =>
            this.tableDeletionProtection(range, context)
        );
        quill.keyboard.addBinding({key: 'Backspace', shiftKey: true}, {}, (range, context) =>
            this.tableDeletionProtection(range, context)
        );
        // since only one matched bindings callback will excute.
        // expected my binding callback excute first
        // I changed the order of binding callbacks
        let thisBindings = quill.keyboard.bindings.Backspace.slice(
            quill.keyboard.bindings.Backspace.length - 2,
            quill.keyboard.bindings.Backspace.length
        );
        quill.keyboard.bindings.Backspace.splice(0, 2, ...thisBindings);
        quill.keyboard.bindings.Backspace.splice(quill.keyboard.bindings.Backspace.length - 2, 2);
        const tableTabBinding = quill.keyboard.bindings.Tab[quill.keyboard.bindings.Tab.length - 1];
        quill.keyboard.bindings.Tab.splice(0, 1, tableTabBinding);
        // add Matchers to match and render quill-better-table for initialization
        // or pasting
        quill.clipboard.addMatcher('td', matchTableCell);
        quill.clipboard.addMatcher('th', matchTableHeader);
        quill.clipboard.addMatcher('table', matchTable);
        // quill.clipboard.addMatcher('h1, h2, h3, h4, h5, h6', matchHeader)

        // remove matcher for tr tag
        quill.clipboard.matchers = quill.clipboard.matchers.filter(matcher => {
            return matcher[0] !== 'tr';
        });

        this.quill.on('selection-change', range => {
            this.correctSelection(range);
        });

        window.addEventListener(
            'resize',
            () => {
                if (this.columnTool) {
                    this.columnTool.updateToolCells();
                    this.columnTool.updateToolWidth();
                }

                if (this.tableSelection) {
                    this.tableSelection.refreshHelpLinesPosition();
                }
            },
            false
        );
    }

    getTable(range = this.quill.getSelection()) {
        if (range == null) return [null, null, null, -1];
        const [cellLine, offset] = this.quill.getLine(range.index);
        if (cellLine == null || cellLine.statics.blotName !== TableCellLine.blotName) {
            return [null, null, null, -1];
        }
        const cell = cellLine.tableCell();
        const row = cell.row();
        const table = row.table();
        return [table, row, cell, offset];
    }

    insertTable(rows, columns) {
        const range = this.quill.getSelection(true);
        if (range == null) return;
        let currentBlot = this.quill.getLeaf(range.index)[0];

        if (isInTableCell(currentBlot)) {
            // eslint-disable-next-line no-console
            console.warn('Can not insert table into a table cell.');
            return;
        }

        let delta = new Delta().retain(range.index);
        delta.insert('\n');
        // insert table column
        delta = new Array(columns).fill('\n').reduce((memo, text) => {
            memo.insert(text, {'table-col': true});
            return memo;
        }, delta);
        // insert table cell line with empty line
        delta = new Array(rows).fill(0).reduce(memo => {
            let tableRowId = rowId();
            return new Array(columns).fill('\n').reduce((memo, text) => {
                memo.insert(text, {'table-cell-line': {row: tableRowId, cell: cellId()}});
                return memo;
            }, memo);
        }, delta);

        this.quill.updateContents(delta, Quill.sources.USER);
        const rangeForSelect = range.index + columns + 1;
        this.quill.setSelection(rangeForSelect, Quill.sources.API);
        const [line] = this.quill.getLine(rangeForSelect);

        if (!isTableCellLine(line)) {
            return;
        }

        const cell = line.parent;

        if (!cell) {
            return;
        }

        const row = cell.parent;

        if (!row) {
            return;
        }

        const tableNode = row.domNode.closest('table');

        if (!tableNode) {
            return;
        }

        this.showTableTools(tableNode, row.domNode, cell.domNode, this.quill, this.options);
    }

    tableInsertColumn(columnType) {
        const tableContainer = Quill.find(this.table);
        const tableSelection = this.tableSelection;
        const tableColumnTool = this.columnTool;
        const columnToolCells = tableColumnTool.colToolCells();

        let colIndex = getColToolCellIndexByBoundary(
            columnToolCells,
            tableSelection.boundary,
            (cellRect, boundary) => {
                return Math.abs(cellRect.x + cellRect.width - boundary.x1) <= ERROR_LIMIT;
            },
            tableSelection.quill.root.parentNode
        );
        const newColumn = tableContainer.insertColumn(
            tableSelection.boundary,
            colIndex,
            columnType === 'right',
            tableSelection.quill.root.parentNode
        );

        tableColumnTool.updateToolCells();
        tableSelection.quill.update(Quill.sources.USER);
        tableSelection.quill.setSelection(tableSelection.quill.getIndex(newColumn[0]), 0, Quill.sources.SILENT);
        tableSelection.setSelection(newColumn[0].domNode, newColumn[0].domNode);
    }

    insertColumnLeft() {
        this.tableInsertColumn('left');
    }

    insertColumnRight() {
        this.tableInsertColumn('right');
    }

    tableInsertRow(rowType) {
        const tableContainer = Quill.find(this.table);
        const tableSelection = this.tableSelection;

        const affectedCells = tableContainer.insertRow(
            tableSelection.boundary,
            rowType === 'below',
            tableSelection.quill.root.parentNode
        );
        tableSelection.quill.update(Quill.sources.USER);
        tableSelection.quill.setSelection(tableSelection.quill.getIndex(affectedCells[0]), 0, Quill.sources.SILENT);
        tableSelection.setSelection(affectedCells[0].domNode, affectedCells[0].domNode);
    }

    insertRowAbove() {
        this.tableInsertRow('above');
    }

    insertRowBelow() {
        this.tableInsertRow('below');
    }

    deleteRow() {
        const tableContainer = Quill.find(this.table);
        const tableSelection = this.tableSelection;

        tableContainer.deleteRow(tableSelection.boundary, tableSelection.quill.root.parentNode);
        tableSelection.quill.update(Quill.sources.USER);
        tableSelection.clearSelection();
    }

    deleteColumn() {
        const tableContainer = Quill.find(this.table);
        const tableSelection = this.tableSelection;
        const tableColumnTool = this.columnTool;
        const columnToolCells = tableColumnTool.colToolCells();

        let colIndexes = getColToolCellIndexesByBoundary(
            columnToolCells,
            tableSelection.boundary,
            (cellRect, boundary) => {
                return cellRect.x + ERROR_LIMIT > boundary.x && cellRect.x + cellRect.width - ERROR_LIMIT < boundary.x1;
            },
            tableSelection.quill.root.parentNode
        );

        let isDeleteTable = tableContainer.deleteColumns(
            tableSelection.boundary,
            colIndexes,
            tableSelection.quill.root.parentNode
        );
        if (!isDeleteTable) {
            tableColumnTool.updateToolCells();
            tableSelection.quill.update(Quill.sources.USER);
            tableSelection.clearSelection();
        }
    }

    deleteTable() {
        const tableContainer = Quill.find(this.table);
        tableContainer.tableDestroy();
    }

    showTableTools(table, rowNode, cellNode, quill, options) {
        this.table = table;
        this.columnTool = new TableColumnTool(table, quill, options);
        this.tableSelection = new TableSelection(
            {
                table,
                row: rowNode,
                cell: cellNode,
            },
            quill,
            options
        );
    }

    hideTableTools() {
        this.columnTool && this.columnTool.destroy();
        this.tableSelection && this.tableSelection.destroy();
        this.tableOperationMenu && this.tableOperationMenu.destroy();
        this.columnTool = null;
        this.tableSelection = null;
        this.tableOperationMenu = null;
        this.table = null;
    }

    showTableOperationMenu(tableNode, rowNode, cellNode, evt) {
        if (this.tableOperationMenu) {
            this.tableOperationMenu = this.tableOperationMenu.destroy();
        }

        if (tableNode) {
            setTimeout(() => {
                this.tableOperationMenu = new TableOperationMenu(
                    {
                        table: tableNode,
                        row: rowNode,
                        cell: cellNode,
                        evt,
                    },
                    this.quill,
                    this.options.operationMenu
                );
            }, 0);
        }
    }

    tableDeletionProtection(range, context) {
        if (range.index === 0 || this.quill.getLength() <= 1) return true;

        const [line] = this.quill.getLine(range.index);

        const isTableLine = isTableCellLine(line);

        if ((!this.tableSelection || this.tableSelection.selectedTds.length === 0) && isTableLine) {
            return false;
        }

        if (context.event.shiftKey && isTableLine) {
            return false;
        }

        if (this.tableSelection && this.tableSelection.selectedTds && this.tableSelection.selectedTds.length > 1) {
            return false;
        }

        if (context.offset === 0) {
            const [prev] = this.quill.getLine(range.index - 1);
            if (prev != null) {
                if (isTableCellLine(prev) && !isTableLine) return false;
            }
        }
        return true;
    }

    correctSelection(range) {
        if (!range) {
            return;
        }

        const lines = this.quill.getLines(range);

        if (lines.length === 0) {
            const [line] = this.quill.getLine(range.index);

            if (!isTableCellLine(line)) {
                return;
            }

            if (!this.tableSelection) {
                this.showTableTools(
                    this.table,
                    line.domNode.closest('tr'),
                    line.parent.domNode,
                    this.quill,
                    this.options
                );
            } else if (this.tableSelection.selectedTds && this.tableSelection.selectedTds.length === 1) {
                this.tableSelection.setSelection(line.parent.domNode, line.parent.domNode);
            }
            return;
        }

        const cellTextLines = lines.filter(line => isTableCellLine(line));
        const cellTextLinesLength = cellTextLines.length;

        if (cellTextLinesLength === 0) {
            return;
        }

        const firstCell = cellTextLines[0];
        const firstLineIndex = this.quill.getIndex(firstCell);
        const firstCellContentLength = firstCell.domNode.textContent.length;

        if (lines.length === 1 && cellTextLinesLength === 1) {
            // when try to select empty cell disable selection
            if (firstCellContentLength === 0) {
                this.quill.setSelection(firstLineIndex);
                return;
            }

            if (!firstCell.parent.next && range.length >= firstCellContentLength) {
                this.quill.setSelection(firstLineIndex, firstCellContentLength);
            }
            return;
        }

        const linesLength = lines.reduce((acc, line) => (acc += line.domNode.textContent.length), 0);

        this.quill.setSelection(firstLineIndex, linesLength + cellTextLinesLength - 1);
    }
}

QuillTable.keyboardBindings = {
    'table-cell-line backspace': {
        key: 'Backspace',
        format: ['table-cell-line'],
        collapsed: true,
        offset: 0,
        handler(range) {
            const [line] = this.quill.getLine(range.index);
            return !(!line.prev || !isTableCellLine(line.prev));
        },
    },

    'table-cell-line delete': {
        key: 'Delete',
        format: ['table-cell-line'],
        collapsed: true,
        suffix: /^$/,
        handler() {},
    },

    'table-cell-line enter': {
        key: 'Enter',
        shiftKey: null,
        format: ['table-cell-line'],
        handler(range, context) {
            // bugfix: a unexpected new line inserted when user compositionend with hitting Enter
            if (this.quill.selection && this.quill.selection.composing) return;
            const Scope = Quill.imports.parchment.Scope;
            if (range.length > 0) {
                this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
            }
            const lineFormats = Object.keys(context.format).reduce((formats, format) => {
                if (this.quill.scroll.query(format, Scope.BLOCK) && !Array.isArray(context.format[format])) {
                    formats[format] = context.format[format];
                }
                return formats;
            }, {});
            // insert new cellLine with lineFormats
            this.quill.insertText(range.index, '\n', lineFormats['table-cell-line'], Quill.sources.USER);
            // Earlier scroll.deleteAt might have messed up our selection,
            // so insertText's built in selection preservation is not reliable
            this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
            this.quill.focus();
            Object.keys(context.format).forEach(name => {
                if (lineFormats[name] != null) return;
                if (Array.isArray(context.format[name])) return;
                if (name === 'link') return;
                this.quill.format(name, context.format[name], Quill.sources.USER);
            });
        },
    },

    'table-cell-line up': makeTableArrowHandler(true),
    'table-cell-line down': makeTableArrowHandler(false),
    'table-cell-line up shift': makeTableArrowHandler(true, true),
    'table-cell-line down shift': makeTableArrowHandler(false, true),
    'down-to-table': {
        key: 'ArrowDown',
        collapsed: true,
        handler(range, context) {
            const target = context.line.next;
            if (target && target.statics.blotName === 'table-view') {
                const targetCell = target.table().rows()[0].children.head;
                const targetLine = targetCell.children.head;

                this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, Quill.sources.USER);

                return false;
            }
            return true;
        },
    },
    'up-to-table': {
        key: 'ArrowUp',
        collapsed: true,
        handler(range, context) {
            const target = context.line.prev;
            if (target && target.statics.blotName === 'table-view') {
                const rows = target.table().rows();
                const targetCell = rows[rows.length - 1].children.head;
                const targetLine = targetCell.children.head;

                this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, Quill.sources.USER);

                return false;
            }
            return true;
        },
    },

    'table-cell-line tab': {
        key: 'Tab',
        format: ['table-cell-line'],
        handler(range, context) {
            if (!isTableCellLine(context.line)) {
                return true;
            }

            const tableCell = context.line.parent;

            if (tableCell.next) {
                const index = this.quill.getIndex(context.line.parent.next);
                this.quill.setSelection(index, Quill.sources.USER);
                return false;
            }

            if (tableCell.parent.next && tableCell.parent.next.children.length > 0) {
                const index = this.quill.getIndex(tableCell.parent.next.children.head);
                this.quill.setSelection(index, Quill.sources.USER);
                return false;
            }

            return false;
        },
    },
};

QuillTable.requiredTableFormats = [
    'table',
    'table-cell-line',
    'table-row',
    'table-body',
    'table-col',
    'table-col-group',
    'table-container',
    'table-view',
];

function makeTableArrowHandler(up, useShift = false) {
    return {
        key: up ? 'ArrowUp' : 'ArrowDown',
        collapsed: true,
        shiftKey: useShift,
        format: ['table-cell-line'],
        handler(range, context) {
            // TODO move to table module
            const key = up ? 'prev' : 'next';
            const targetLine = context.line[key];
            if (targetLine != null) return true;

            const cell = context.line.parent;
            const targetRow = cell.parent[key];

            if (targetRow != null && targetRow.statics.blotName === 'table-row') {
                let targetCell = targetRow.children.head;
                let totalColspanOfTargetCell = parseInt(targetCell.formats().colspan, 10);
                let cur = cell;
                let totalColspanOfCur = parseInt(cur.formats().colspan, 10);

                // get targetCell above current cell depends on colspan
                while (cur.prev != null) {
                    cur = cur.prev;
                    totalColspanOfCur += parseInt(cur.formats().colspan, 10);
                }

                while (targetCell.next != null && totalColspanOfTargetCell < totalColspanOfCur) {
                    targetCell = targetCell.next;
                    totalColspanOfTargetCell += parseInt(targetCell.formats().colspan, 10);
                }

                const index = targetCell.offset(this.quill.scroll);
                this.quill.setSelection(index, 0, Quill.sources.USER);
            } else {
                const targetLine = cell.table().parent[key];
                if (targetLine != null) {
                    if (up) {
                        this.quill.setSelection(
                            targetLine.offset(this.quill.scroll) + targetLine.length() - 1,
                            0,
                            Quill.sources.USER
                        );
                    } else {
                        this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, Quill.sources.USER);
                    }
                }
            }
            return false;
        },
    };
}

function isInTableCell(current) {
    return Boolean(current.domNode.closest && current.domNode.closest('table'));
}

function isTableCellLine(current) {
    return current.statics.blotName === 'table-cell-line';
}

export default QuillTable;
