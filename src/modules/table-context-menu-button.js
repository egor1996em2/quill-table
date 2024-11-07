import {css, getRelativeRect} from '../utils/index';

export default class TableContextMenuButton {
    constructor(quill, options) {
        this.quill = quill;
        this.cellNode = options.cellNode;

        this.init(options);
    }

    init({tableNode, rowNode}) {
        if (this.domNode) {
            this.hideContextMenuButton();
        }

        const parent = this.quill.root.parentNode;

        this.domNode = document.createElement('button');
        this.domNode.classList.add('quill-table-operation-menu__context-btn');

        this.domNode.addEventListener('click', evt => {
            const quillTable = this.quill.getModule('quill-table');
            const tableSelection = quillTable.tableSelection;
            if (tableSelection && tableSelection.selectedTds.length <= 1) {
                tableSelection.highlitSelection(this.cellNode);
            }
            quillTable.showTableOperationMenu(tableNode, rowNode, this.cellNode, evt);
        });

        this.calculateButtonPosition();

        parent.appendChild(this.domNode);
    }

    calculateButtonPosition() {
        const parent = this.quill.root.parentNode;
        const cellRect = getRelativeRect(this.cellNode.getBoundingClientRect(), parent);
        css(this.domNode, {
            top: `${cellRect.y + 2}px`,
            left: `${cellRect.x1 + 2}px`,
        });
    }

    destroy() {
        if (this.domNode) {
            this.domNode.remove();
        }
        return null;
    }
}
