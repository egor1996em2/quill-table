import Quill from 'quill';
import {css, getRelativeRect} from '../utils';
import {translate} from '../utils/translate';

import {getColToolCellIndexesByBoundary} from 'src/utils/table-util';
import {ERROR_LIMIT} from 'src/contants';

const MENU_MIN_HEIGHT = 150;
const DEFAULT_CELL_COLORS = ['white', 'red', 'yellow', 'blue'];
const DEFAULT_COLOR_SUBTITLE = 'Background Colors';

const MENU_ITEMS_DEFAULT = {
    insertColumnRight: {
        text: translate('insert_column_right'),
        iconClass: 'quill-table-operation-menu__icon-add-column-right',
        handler() {
            const tableContainer = Quill.find(this.table);
            const rightCell = this.selectedTds[this.selectedTds.length - 1];
            const cells = rightCell.domNode.parentNode.querySelectorAll('.quill-table__cell');
            let colIndex = Array.from(cells).indexOf(rightCell.domNode);

            const newColumn = tableContainer.insertColumn(this.boundary, colIndex, true, this.quill.root.parentNode);

            this.tableColumnTool.updateToolCells();
            this.quill.update(Quill.sources.USER);
            this.quill.setSelection(this.quill.getIndex(newColumn[0]), 0, Quill.sources.SILENT);
            this.tableSelection.setSelection(
                newColumn[0].domNode.getBoundingClientRect(),
                newColumn[0].domNode.getBoundingClientRect()
            );
        },
    },

    insertColumnLeft: {
        text: translate('insert_column_left'),
        iconClass: 'quill-table-operation-menu__icon-add-column-left',
        handler() {
            const tableContainer = Quill.find(this.table);
            const leftCell = this.selectedTds[0];
            const cells = leftCell.domNode.parentNode.querySelectorAll('.quill-table__cell');
            let colIndex = Array.from(cells).indexOf(leftCell.domNode);

            const newColumn = tableContainer.insertColumn(this.boundary, colIndex, false, this.quill.root.parentNode);

            this.tableColumnTool.updateToolCells();
            this.quill.update(Quill.sources.USER);
            this.quill.setSelection(this.quill.getIndex(newColumn[0]), 0, Quill.sources.SILENT);
            this.tableSelection.setSelection(
                newColumn[0].domNode.getBoundingClientRect(),
                newColumn[0].domNode.getBoundingClientRect()
            );
        },
    },

    insertRowUp: {
        text: translate('insert_row_up'),
        iconClass: 'quill-table-operation-menu__icon-add-column-top',
        handler() {
            const tableContainer = Quill.find(this.table);
            const affectedCells = tableContainer.insertRow(this.boundary, false, this.quill.root.parentNode);
            this.quill.update(Quill.sources.USER);
            this.quill.setSelection(this.quill.getIndex(affectedCells[0]), 0, Quill.sources.SILENT);
            this.tableSelection.setSelection(
                affectedCells[0].domNode.getBoundingClientRect(),
                affectedCells[0].domNode.getBoundingClientRect()
            );
        },
    },

    insertRowDown: {
        text: translate('insert_row_bottom'),
        iconClass: 'quill-table-operation-menu__icon-add-column-bottom',
        handler() {
            const tableContainer = Quill.find(this.table);
            const affectedCells = tableContainer.insertRow(this.boundary, true, this.quill.root.parentNode);
            this.quill.update(Quill.sources.USER);
            this.quill.setSelection(this.quill.getIndex(affectedCells[0]), 0, Quill.sources.SILENT);
            this.tableSelection.setSelection(
                affectedCells[0].domNode.getBoundingClientRect(),
                affectedCells[0].domNode.getBoundingClientRect()
            );
        },
    },

    mergeCells: {
        text: translate('merge_cells'),
        iconClass: 'quill-table-operation-menu__icon-merge-cells',
        handler() {
            const tableContainer = Quill.find(this.table);
            // compute merged Cell rowspan, equal to length of selected rows
            const rowspan = tableContainer.rows().reduce((sum, row) => {
                let rowRect = getRelativeRect(row.domNode.getBoundingClientRect(), this.quill.root.parentNode);
                if (
                    rowRect.y > this.boundary.y - ERROR_LIMIT &&
                    rowRect.y + rowRect.height < this.boundary.y + this.boundary.height + ERROR_LIMIT
                ) {
                    sum += 1;
                }
                return sum;
            }, 0);

            // compute merged cell colspan, equal to length of selected cols
            const colspan = this.columnToolCells.reduce((sum, cell) => {
                let cellRect = getRelativeRect(cell.getBoundingClientRect(), this.quill.root.parentNode);
                if (
                    cellRect.x > this.boundary.x - ERROR_LIMIT &&
                    cellRect.x + cellRect.width < this.boundary.x + this.boundary.width + ERROR_LIMIT
                ) {
                    sum += 1;
                }
                return sum;
            }, 0);

            const mergedCell = tableContainer.mergeCells(
                this.boundary,
                this.selectedTds,
                rowspan,
                colspan,
                this.quill.root.parentNode
            );
            this.quill.update(Quill.sources.USER);
            this.tableSelection.setSelection(
                mergedCell.domNode.getBoundingClientRect(),
                mergedCell.domNode.getBoundingClientRect()
            );
        },
    },

    unmergeCells: {
        text: translate('unmerge_cells'),
        iconClass: 'quill-table-operation-menu__icon-slpit-cells',
        handler() {
            const tableContainer = Quill.find(this.table);
            tableContainer.unmergeCells(this.selectedTds, this.quill.root.parentNode);
            this.quill.update(Quill.sources.USER);
            this.tableSelection.clearSelection();
        },
    },

    deleteColumn: {
        text: translate('delete_columns'),
        iconClass: 'quill-table-operation-menu__icon-remove-column',
        handler() {
            const tableContainer = Quill.find(this.table);
            let colIndexes = getColToolCellIndexesByBoundary(
                this.columnToolCells,
                this.boundary,
                (cellRect, boundary) => {
                    return (
                        cellRect.x + ERROR_LIMIT > boundary.x && cellRect.x + cellRect.width - ERROR_LIMIT < boundary.x1
                    );
                },
                this.quill.root.parentNode
            );

            let isDeleteTable = tableContainer.deleteColumns(this.boundary, colIndexes, this.quill.root.parentNode);
            if (!isDeleteTable) {
                this.tableColumnTool.updateToolCells();
                this.quill.update(Quill.sources.USER);
                this.tableSelection.clearSelection();
            }
        },
    },

    deleteRow: {
        text: translate('delete_rows'),
        iconClass: 'quill-table-operation-menu__icon-remove-row',
        handler() {
            const tableContainer = Quill.find(this.table);
            tableContainer.deleteRow(this.boundary, this.quill.root.parentNode);
            this.quill.update(Quill.sources.USER);
            this.tableSelection.clearSelection();
        },
    },

    deleteTable: {
        text: translate('delete_table'),
        iconClass: 'quill-table-operation-menu__icon-delete-table',
        handler() {
            const betterTableModule = this.quill.getModule('quill-table');
            const tableContainer = Quill.find(this.table);
            betterTableModule.hideTableTools();
            tableContainer.remove();
            this.quill.update(Quill.sources.USER);
        },
    },
};

export default class TableOperationMenu {
    constructor(params, quill, options = {}) {
        const betterTableModule = quill.getModule('quill-table');
        this.tableSelection = betterTableModule.tableSelection;
        this.table = params.table;
        this.quill = quill;
        this.options = options;
        this.menuItems = Object.assign({}, MENU_ITEMS_DEFAULT, options.items || {});
        this.tableColumnTool = betterTableModule.columnTool;
        this.boundary = this.tableSelection.boundary;
        this.selectedTds = this.tableSelection.selectedTds;
        this.destroyHandler = this.destroy.bind(this);
        this.columnToolCells = this.tableColumnTool.colToolCells();
        this.colorSubTitle = options.color && options.color.text ? options.color.text : DEFAULT_COLOR_SUBTITLE;
        this.cellColors = options.color && options.color.colors ? options.color.colors : DEFAULT_CELL_COLORS;

        this.menuInitial(params);
        this.mount();
        document.addEventListener('click', this.destroyHandler, false);
    }

    mount() {
        document.body.appendChild(this.domNode);
    }

    destroy() {
        this.domNode.remove();
        document.removeEventListener('click', this.destroyHandler, false);
        return null;
    }

    menuInitial({left, top}) {
        this.domNode = document.createElement('div');
        this.domNode.classList.add('quill-table-operation-menu');
        css(this.domNode, {
            position: 'absolute',
            left: `${left}px`,
            top: `${top}px`,
            'min-height': `${MENU_MIN_HEIGHT}px`,
            'max-width': 'min(-10px + 100vw, 300px);',
        });

        for (let name in this.menuItems) {
            if (this.menuItems[name]) {
                this.domNode.appendChild(
                    this.menuItemCreator(Object.assign({}, MENU_ITEMS_DEFAULT[name], this.menuItems[name]))
                );

                if (['insertRowDown', 'unmergeCells'].indexOf(name) > -1) {
                    this.domNode.appendChild(dividingCreator());
                }
            }
        }

        // if colors option is false, disabled bg color
        if (this.options.color && this.options.color !== false) {
            this.domNode.appendChild(dividingCreator());
            this.domNode.appendChild(subTitleCreator(this.colorSubTitle));
            this.domNode.appendChild(this.colorsItemCreator(this.cellColors));
        }

        // create dividing line
        function dividingCreator() {
            const dividing = document.createElement('div');
            dividing.classList.add('quill-table-operation-menu__divider');
            return dividing;
        }

        // create subtitle for menu
        function subTitleCreator(title) {
            const subTitle = document.createElement('div');
            subTitle.classList.add('quill-table-operation-menu__subtitle');
            subTitle.innerText = title;
            return subTitle;
        }
    }

    colorsItemCreator(colors) {
        const self = this;
        const node = document.createElement('div');
        node.classList.add('quill-table-color-picker');

        colors.forEach(color => {
            let colorBox = colorBoxCreator(color);
            node.appendChild(colorBox);
        });

        function colorBoxCreator(color) {
            const box = document.createElement('div');
            box.classList.add('quill-table-color-picker__item');
            box.setAttribute('data-color', color);
            box.style.backgroundColor = color;

            box.addEventListener(
                'click',
                function () {
                    const selectedTds = self.tableSelection.selectedTds;
                    if (selectedTds && selectedTds.length > 0) {
                        selectedTds.forEach(tableCell => {
                            tableCell.format('cell-bg', color);
                        });
                    }
                },
                false
            );

            return box;
        }

        return node;
    }

    menuItemCreator({text, iconClass, handler}) {
        const node = document.createElement('div');
        node.classList.add('quill-table-operation-menu__item');

        const iconSpan = document.createElement('span');
        iconSpan.classList.add('quill-table-operation-menu__icon');
        iconSpan.classList.add(iconClass);

        const textSpan = document.createElement('span');
        textSpan.classList.add('quill-table-operation-menu__text');
        textSpan.innerText = text;

        node.appendChild(iconSpan);
        node.appendChild(textSpan);
        node.addEventListener('click', handler.bind(this), false);
        return node;
    }
}
