import Quill from 'quill';
import {css} from '../utils';
import {CELL_MIN_WIDTH, COL_TOOL_CELL_HEIGHT, COL_TOOL_HEIGHT, PRIMARY_COLOR} from 'src/contants';

export default class TableColumnTool {
    constructor(table, quill, options) {
        if (!table) return null;
        this.table = table;
        this.quill = quill;
        this.options = options;
        this.domNode = null;

        this.initColTool();
    }

    initColTool() {
        const parent = this.quill.root.parentNode;
        const tableViewRect = this.table.parentNode.getBoundingClientRect();
        this.domNode = document.createElement('div');
        this.domNode.classList.add('quill-table-col-tool');
        this.updateToolCells();
        parent.appendChild(this.domNode);
        css(this.domNode, {
            width: `${tableViewRect.width}px`,
            height: `${COL_TOOL_HEIGHT}px`,
            left: `${this.table.offsetLeft + parent.scrollLeft}px`,
            top: `${this.table.offsetTop + parent.scrollTop - COL_TOOL_HEIGHT - 8}px`,
        });
    }

    createToolCell(isClassName = true) {
        const toolCell = document.createElement('div');
        toolCell.classList.add('quill-table-col-tool__cell');
        const resizeHolder = document.createElement('div');
        if (isClassName) {
            resizeHolder.classList.add('quill-table-col-tool__cell-holder');
        }
        css(toolCell, {
            height: `${COL_TOOL_CELL_HEIGHT}px`,
        });
        toolCell.appendChild(resizeHolder);
        return toolCell;
    }

    updateToolCells() {
        return new Promise(resolve => {
            setTimeout(() => {
                const tableContainer = Quill.find(this.table);
                const CellsInFirstRow = tableContainer.children.tail.children.head.children;
                const tableCols = tableContainer.colGroup().children;

                const tableWidth = tableContainer.children.tail.domNode.clientWidth;

                const cellsNumber = computeCellsNumber(CellsInFirstRow);
                let existCells = Array.from(this.domNode.querySelectorAll('.quill-table-col-tool__cell'));

                const totalCount = Math.max(cellsNumber, existCells.length);
                for (let index = 0; index < totalCount; index++) {
                    let col = tableCols.at(index);
                    let colWidth = col && col.attributes.domNode.clientWidth;
                    // if cell already exist
                    let toolCell = null;
                    if (!existCells[index]) {
                        toolCell = this.createToolCell(index + 1 !== totalCount);
                        this.domNode.appendChild(toolCell);
                        this.addColCellHolderHandler(toolCell);
                        // set tool cell width
                        const colWidthRate = (colWidth / tableWidth) * 100;
                        css(toolCell, {
                            width: `${colWidthRate}%`,
                        });
                    } else if (existCells[index] && index >= cellsNumber) {
                        existCells[index].remove();
                    } else {
                        toolCell = existCells[index];
                        const colWidthRate = (colWidth / tableWidth) * 100;

                        // set tool cell width
                        css(toolCell, {
                            width: `${colWidthRate}%`,
                        });
                    }
                }
                resolve();
            }, 0);
        });
    }

    destroy() {
        this.domNode.remove();
        return null;
    }

    addColCellHolderHandler(cell) {
        const tableContainer = Quill.find(this.table);
        const $holder = cell.querySelector('.quill-table-col-tool__cell-holder');
        let dragging = false;
        let x0 = 0;
        let x = 0;
        let delta = 0;
        let width0 = 0;
        // helpLine relation varrible
        let tableRect = {};
        let cellRect = {};
        let $helpLine = null;

        const handleDrag = e => {
            e.preventDefault();

            if (dragging) {
                x = e.clientX;

                if (width0 + x - x0 >= CELL_MIN_WIDTH) {
                    delta = x - x0;
                } else {
                    delta = CELL_MIN_WIDTH - width0;
                }

                css($helpLine, {
                    left: `${cellRect.left + cellRect.width - 1 + delta}px`,
                });
            }
        };

        const handleMouseup = e => {
            e.preventDefault();
            const existCells = Array.from(this.domNode.querySelectorAll('.quill-table-col-tool__cell'));
            const colIndex = existCells.indexOf(cell);
            const colBlot = tableContainer.colGroup().children.at(colIndex);
            const nextColBlot = colBlot.next;
            const nextCell = nextColBlot.domNode;
            const nextCellWidth = nextCell.clientWidth;

            if (dragging) {
                colBlot.format('width', width0 + delta);
                nextColBlot.format('width', nextCellWidth - delta);

                x0 = 0;
                x = 0;
                delta = 0;
                width0 = 0;
                dragging = false;
                $holder.classList.remove('dragging');
            }

            document.removeEventListener('mousemove', handleDrag, false);
            document.removeEventListener('mouseup', handleMouseup, false);
            tableRect = {};
            cellRect = {};
            $helpLine.remove();
            $helpLine = null;
            tableContainer.updateTableWidth();

            const tableSelection = this.quill.getModule('quill-table').tableSelection;
            tableSelection && tableSelection.clearSelection();
            this.updateToolCells();
        };

        const handleMousedown = e => {
            document.addEventListener('mousemove', handleDrag, false);
            document.addEventListener('mouseup', handleMouseup, false);

            tableRect = this.table.getBoundingClientRect();
            cellRect = cell.getBoundingClientRect();
            $helpLine = document.createElement('div');
            css($helpLine, {
                position: 'fixed',
                top: `${cellRect.top}px`,
                left: `${cellRect.left + cellRect.width - 1}px`,
                zIndex: '100',
                height: `${tableRect.height + COL_TOOL_HEIGHT + 4}px`,
                width: '1px',
                backgroundColor: PRIMARY_COLOR,
            });

            document.body.appendChild($helpLine);
            dragging = true;
            x0 = e.clientX;
            width0 = cellRect.width;
            $holder.classList.add('dragging');
        };
        if ($holder !== null) {
            $holder.addEventListener('mousedown', handleMousedown, false);
        }
    }

    colToolCells() {
        return Array.from(this.domNode.querySelectorAll('.quill-table-col-tool__cell'));
    }
}

function computeCellsNumber(CellsInFirstRow) {
    return CellsInFirstRow.reduce((sum, cell) => {
        const cellColspan = cell.formats().colspan;
        sum = sum + parseInt(cellColspan, 10);
        return sum;
    }, 0);
}
