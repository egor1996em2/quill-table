import Quill from 'quill';
import {css, getRelativeRect} from '../utils';
import {TableCell} from '../formats/table';
import TableContextMenuButton from './table-context-menu-button';
import {getElementPositionInTable} from '../utils/table-util';

const PRIMARY_COLOR = '#0589f3';
const LINE_POSITIONS = ['left', 'right', 'top', 'bottom'];
const ERROR_LIMIT = 2;

export default class TableSelection {
    constructor({table, cell, row}, quill, options) {
        if (!table) return null;
        this.table = table;
        this.rowNode = row;
        this.cellNode = cell;
        this.quill = quill;
        this.options = options;
        this.boundary = {}; // params for selected square
        this.selectedTds = []; // array for selected table-cells
        this.dragging = false;
        this.selectingHandler = this.mouseDownHandler.bind(this);
        this.clearSelectionHandler = this.clearSelection.bind(this);

        this.helpLinesInitial();
        this.quill.root.addEventListener('mousedown', this.selectingHandler, false);
        this.quill.root.addEventListener('keydown', () => this.selectCell(), false);
        this.quill.on('text-change', delta => {
            if (this.selectedTds.length === 0) {
                return;
            }

            const selectedIds = this.selectedTds.slice(1);

            if (this.selectedTds.length === 1) {
                this.refreshHelpLinesPosition();
                return;
            }

            this.clearSelectionHandler();
            this.applyChangesForSelection(selectedIds, delta);
        });

        if (cell) {
            this.highlitSelection(cell);
        }
    }

    helpLinesInitial() {
        let parent = this.quill.root.parentNode;
        LINE_POSITIONS.forEach(direction => {
            this[direction] = document.createElement('div');
            this[direction].classList.add('quill-table__selection-line');
            this[direction].classList.add('quill-table__selection-line-' + direction);
            css(this[direction], {
                position: 'absolute',
                display: 'none',
                'background-color': PRIMARY_COLOR,
            });
            parent.appendChild(this[direction]);
        });
    }

    mouseDownHandler(e) {
        if (e.button !== 0 || !e.target.closest('.quill-table__table')) return;

        const selectionStart = this.highlitSelection(e.target);

        if (!selectionStart) {
            return;
        }

        let mouseLeaveTimeout = null;

        this.quill.root.addEventListener('mousemove', mouseMoveHandler, false);
        document.addEventListener('mouseup', mouseUpHandler, false);
        this.quill.root.addEventListener('mouseleave', mouseLeaveHandler, false);
        const selectedCells = this.table.querySelectorAll('.quill-table__cell-line--selected');
        let endTd;

        selectedCells.forEach(cell => {
            cell.classList.remove('quill-table__cell-line--selected');
        });

        const self = this;
        this.dragging = true;

        function mouseMoveHandler(e) {
            if (e.button !== 0 || !e.target.closest('.quill-table__table')) return;

            if (!selectionStart) {
                return;
            }

            if (mouseLeaveTimeout) {
                clearTimeout(mouseLeaveTimeout);
            }

            endTd = e.target.closest('td[data-row]');

            if (!endTd) {
                return;
            }

            const endTdRect = getRelativeRect(endTd.getBoundingClientRect(), self.quill.root.parentNode);
            self.boundary = computeBoundaryFromRects(selectionStart.startTdRect, endTdRect);
            self.correctBoundary();
            self.selectedTds = self.computeSelectedTds(selectionStart.startTd, endTd);
            setTimeout(() => {
                self.refreshHelpLinesPosition();
                self.showContextMenuButton(endTd);
            }, 0);

            // avoid select text in multiple table-cell
            if (selectionStart.startTd !== endTd) {
                self.quill.blur();
            }
        }

        function mouseUpHandler() {
            if (mouseLeaveTimeout) {
                clearTimeout(mouseLeaveTimeout);
            }
            self.quill.root.removeEventListener('mousemove', mouseMoveHandler, false);
            document.removeEventListener('mouseup', mouseUpHandler, false);
            self.quill.root.removeEventListener('mouseleave', mouseLeaveHandler, false);
            self.dragging = false;
            self.selectCell();

            const targetTd = endTd || selectionStart.startTd;

            if (!targetTd) {
                return;
            }

            self.showContextMenuButton(targetTd);
        }

        function mouseLeaveHandler(evt) {
            if (!self.dragging) {
                return;
            }

            if (isEventFromTableParts(evt)) {
                return;
            }

            if (mouseLeaveTimeout) {
                clearTimeout(mouseLeaveTimeout);
            }

            mouseLeaveTimeout = setTimeout(() => {
                mouseUpHandler();
            }, 550);
        }
    }

    highlitSelection(target) {
        const startTd = target.closest('td[data-row]');
        const startTdRect = getRelativeRect(startTd.getBoundingClientRect(), this.quill.root.parentNode);
        this.boundary = computeBoundaryFromRects(startTdRect, startTdRect);
        this.correctBoundary();
        this.selectedTds = this.computeSelectedTds(startTd, startTd);
        this.repositionHelpLines();
        this.showContextMenuButton(startTd);

        return {
            startTd,
            startTdRect,
        };
    }

    correctBoundary() {
        const tableContainer = Quill.find(this.table);
        const tableCells = tableContainer.descendants(TableCell);

        tableCells.forEach(tableCell => {
            let {x, y, width, height} = getRelativeRect(
                tableCell.domNode.getBoundingClientRect(),
                this.quill.root.parentNode
            );
            let isCellIntersected =
                ((x + ERROR_LIMIT >= this.boundary.x && x + ERROR_LIMIT <= this.boundary.x1) ||
                    (x - ERROR_LIMIT + width >= this.boundary.x && x - ERROR_LIMIT + width <= this.boundary.x1)) &&
                ((y + ERROR_LIMIT >= this.boundary.y && y + ERROR_LIMIT <= this.boundary.y1) ||
                    (y - ERROR_LIMIT + height >= this.boundary.y && y - ERROR_LIMIT + height <= this.boundary.y1));
            if (isCellIntersected) {
                this.boundary = computeBoundaryFromRects(this.boundary, {x, y, width, height});
            }
        });
    }

    computeSelectedTds(startTarget, endTarget) {
        if (startTarget.tagName !== 'TD' || endTarget.tagName !== 'TD') {
            return [];
        }

        const rows = Array.from(this.table.querySelectorAll('tr'));

        const startTargetPosition = getElementPositionInTable(startTarget, rows);

        if (startTargetPosition.row === null || startTargetPosition.col === null) {
            return [];
        }

        const endTargetPosition = getElementPositionInTable(endTarget, rows);

        if (!endTargetPosition.row === null || endTargetPosition.col === null) {
            return [];
        }

        const selectedTds = [];

        const {iterationStart, iterationEnd, beginSelectionIndex, endSelectionIndex} = getSelectionIterationParams(
            startTargetPosition,
            endTargetPosition
        );

        for (let i = iterationStart; i <= iterationEnd; i++) {
            const tds = Array.from(rows[i].children).slice(beginSelectionIndex, endSelectionIndex + 1);
            selectedTds.push(...tds.map(tdElement => Quill.find(tdElement)));
        }

        return selectedTds;
    }

    repositionHelpLines() {
        if (!this.left || !this.right || !this.top || !this.bottom) {
            return;
        }

        const tableViewScrollLeft = this.table.parentNode.scrollLeft;
        css(this.left, {
            display: 'block',
            left: `${this.boundary.x - tableViewScrollLeft - 1}px`,
            top: `${this.boundary.y}px`,
            height: `${this.boundary.height + 1}px`,
            width: '1px',
        });

        css(this.right, {
            display: 'block',
            left: `${this.boundary.x1 - tableViewScrollLeft}px`,
            top: `${this.boundary.y}px`,
            height: `${this.boundary.height + 1}px`,
            width: '1px',
        });

        css(this.top, {
            display: 'block',
            left: `${this.boundary.x - 1 - tableViewScrollLeft}px`,
            top: `${this.boundary.y}px`,
            width: `${this.boundary.width + 1}px`,
            height: '1px',
        });

        css(this.bottom, {
            display: 'block',
            left: `${this.boundary.x - 1 - tableViewScrollLeft}px`,
            top: `${this.boundary.y1 + 1}px`,
            width: `${this.boundary.width + 1}px`,
            height: '1px',
        });
    }

    // based on selectedTds compute positions of help lines
    // It is useful when selectedTds are not changed
    refreshHelpLinesPosition() {
        if (this.selectedTds.length === 0) {
            return;
        }

        const startRect = getRelativeRect(
            this.selectedTds[0].domNode.getBoundingClientRect(),
            this.quill.root.parentNode
        );
        const endRect = getRelativeRect(
            this.selectedTds[this.selectedTds.length - 1].domNode.getBoundingClientRect(),
            this.quill.root.parentNode
        );

        if (this.contextMenuButton) {
            this.contextMenuButton.calculateButtonPosition();
        }

        this.boundary = computeBoundaryFromRects(startRect, endRect);
        this.repositionHelpLines();
    }

    destroy() {
        LINE_POSITIONS.forEach(direction => {
            this[direction].remove();
            this[direction] = null;
        });

        this.quill.root.removeEventListener('mousedown', this.selectingHandler, false);

        this.quill.off('text-change', this.clearSelectionHandler);

        this.hideContextMenuButton();

        return null;
    }

    setSelection(startTd, endTd) {
        const startRect = startTd.getBoundingClientRect();
        const endRect = endTd.getBoundingClientRect();
        this.boundary = computeBoundaryFromRects(
            getRelativeRect(startRect, this.quill.root.parentNode),
            getRelativeRect(endRect, this.quill.root.parentNode)
        );
        this.correctBoundary();
        this.selectedTds = this.computeSelectedTds(startTd, endTd);
        setTimeout(() => {
            this.refreshHelpLinesPosition();
            this.showContextMenuButton(this.selectedTds[this.selectedTds.length - 1].domNode);
        }, 0);
    }

    clearSelection() {
        if (this.selectedTds.length > 1) {
            window.getSelection().removeAllRanges();
        }

        this.boundary = {};
        this.selectedTds = [];
        LINE_POSITIONS.forEach(direction => {
            this[direction] &&
                css(this[direction], {
                    display: 'none',
                });
        });
        this.hideContextMenuButton();
    }

    selectCell() {
        if (this.selectedTds.length <= 1) {
            return;
        }

        const startCell = this.selectedTds[0];

        const selection = window.getSelection();
        selection.removeAllRanges();

        const range = document.createRange();

        range.setStart(startCell.domNode, 0);
        range.setEnd(startCell.domNode, 1);

        selection.addRange(range);

        this.selectedTds.forEach(cell => {
            cell.domNode.classList.add('quill-table__cell-line--selected');
        });
    }

    keyDownButtonHandler() {
        this.selectCell();
    }

    applyChangesForSelection(selectedIds, delta) {
        const attributes = delta.ops.reduce((acc, op) => {
            if (!op.attributes) {
                return acc;
            }

            Object.entries(op.attributes).forEach(([name, val]) => {
                acc[name] = val;
            });

            return acc;
        }, {});

        selectedIds.forEach(cell => {
            const index = this.quill.getIndex(cell);
            this.quill.formatLine(index, 0, attributes);
            this.quill.formatText(index, cell.domNode.textContent.length, attributes);
        });

        this.quill.setSelection(null);
    }

    showContextMenuButton(cellNode) {
        this.hideContextMenuButton();
        this.contextMenuButton = new TableContextMenuButton(this.quill, {
            tableNode: this.table,
            rowNode: this.rowNode,
            cellNode: cellNode,
        });
    }

    hideContextMenuButton() {
        if (!this.contextMenuButton) {
            return;
        }

        this.contextMenuButton = this.contextMenuButton.destroy();
    }
}

function computeBoundaryFromRects(startRect, endRect) {
    let x = Math.min(startRect.x, endRect.x, startRect.x + startRect.width - 1, endRect.x + endRect.width - 1);

    let x1 = Math.max(startRect.x, endRect.x, startRect.x + startRect.width - 1, endRect.x + endRect.width - 1);

    let y = Math.min(startRect.y, endRect.y, startRect.y + startRect.height - 1, endRect.y + endRect.height - 1);

    let y1 = Math.max(startRect.y, endRect.y, startRect.y + startRect.height - 1, endRect.y + endRect.height - 1);

    let width = x1 - x;
    let height = y1 - y;

    return {x, x1, y, y1, width, height};
}

function isEventFromTableParts(evt) {
    const isOutFromInternalElement =
        evt.relatedTarget && evt.relatedTarget.closest && evt.relatedTarget.closest('.quill-table__wrapper');
    const isOutFromSelectionLine =
        evt.relatedTarget && evt.relatedTarget.classList.contains('quill-table__selection-line');
    const isOutFromContextButton =
        evt.relatedTarget && evt.relatedTarget.classList.contains('quill-table-operation-menu__context-btn');

    return isOutFromInternalElement || isOutFromSelectionLine || isOutFromContextButton;
}

function getSelectionIterationParams(startPosition, endPosition) {
    return {
        iterationStart: Math.min(startPosition.row, endPosition.row),
        iterationEnd: Math.max(startPosition.row, endPosition.row),
        beginSelectionIndex: Math.min(startPosition.col, endPosition.col),
        endSelectionIndex: Math.max(startPosition.col, endPosition.col),
    };
}
