import Quill from 'quill';
import {css, getRelativeRect} from '../utils';
import {TableCell} from '../formats/table';
import TableContextMenuButton from './table-context-menu-button';

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
            if (this.selectedTds.length <= 1) {
                return;
            }

            const selectedIds = this.selectedTds.slice(1);
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

        let mouseLeaveTimeout = null;

        this.quill.root.addEventListener('mousemove', mouseMoveHandler, false);
        this.quill.root.addEventListener('mouseup', mouseUpHandler, false);
        this.quill.root.addEventListener('mouseleave', mouseLeaveHandler, false);
        const selectedCells = this.table.querySelectorAll('.quill-table__cell-line--selected');
        let endTd;

        selectedCells.forEach(cell => {
            cell.classList.remove('quill-table__cell-line--selected');
        });

        const self = this;
        this.dragging = true;
        const {startTd, startTdRect} = this.highlitSelection(e.target);

        function mouseMoveHandler(e) {
            if (e.button !== 0 || !e.target.closest('.quill-table__table')) return;

            if (mouseLeaveTimeout) {
                clearTimeout(mouseLeaveTimeout);
            }

            endTd = e.target.closest('td[data-row]');
            const endTdRect = getRelativeRect(endTd.getBoundingClientRect(), self.quill.root.parentNode);

            self.boundary = computeBoundaryFromRects(startTdRect, endTdRect);
            self.correctBoundary();
            self.selectedTds = self.computeSelectedTds();
            self.repositionHelpLines();
            self.showContextMenuButton(endTd);

            // avoid select text in multiple table-cell
            if (startTd !== endTd) {
                self.quill.blur();
            }
        }

        function mouseUpHandler() {
            if (mouseLeaveTimeout) {
                clearTimeout(mouseLeaveTimeout);
            }
            self.quill.root.removeEventListener('mousemove', mouseMoveHandler, false);
            self.quill.root.removeEventListener('mouseup', mouseUpHandler, false);
            self.quill.root.removeEventListener('mouseleave', mouseLeaveHandler, false);
            self.dragging = false;
            self.selectCell();
            self.showContextMenuButton(endTd || startTd);
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
            }, 1000);
        }
    }

    highlitSelection(target) {
        const startTd = target.closest('td[data-row]');
        const startTdRect = getRelativeRect(startTd.getBoundingClientRect(), this.quill.root.parentNode);
        this.boundary = computeBoundaryFromRects(startTdRect, startTdRect);
        this.correctBoundary();
        this.selectedTds = this.computeSelectedTds();
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

    computeSelectedTds() {
        const tableContainer = Quill.find(this.table);
        const tableCells = tableContainer.descendants(TableCell);

        return tableCells.reduce((selectedCells, tableCell) => {
            let {x, y, width, height} = getRelativeRect(
                tableCell.domNode.getBoundingClientRect(),
                this.quill.root.parentNode
            );
            let isCellIncluded =
                x + ERROR_LIMIT >= this.boundary.x &&
                x - ERROR_LIMIT + width <= this.boundary.x1 &&
                y + ERROR_LIMIT >= this.boundary.y &&
                y - ERROR_LIMIT + height <= this.boundary.y1;

            if (isCellIncluded) {
                selectedCells.push(tableCell);
            }

            return selectedCells;
        }, []);
    }

    repositionHelpLines() {
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

    setSelection(startRect, endRect) {
        this.boundary = computeBoundaryFromRects(
            getRelativeRect(startRect, this.quill.root.parentNode),
            getRelativeRect(endRect, this.quill.root.parentNode)
        );
        this.correctBoundary();
        this.selectedTds = this.computeSelectedTds();
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
