import {css, getRelativeRect} from '../utils/index';

export default class TableContextMenuButton {
    constructor(quill, options) {
        this.quill = quill;

        this.init(options);
    }

    init({tableNode, rowNode, cellNode}) {
        if (this.domNode) {
            this.hideContextMenuButton();
        }

        const parent = this.quill.root.parentNode;

        const button = document.createElement('button');
        button.classList.add('quill-table-operation-menu__context-btn');

        const cellRect = getRelativeRect(cellNode.getBoundingClientRect(), parent);
        css(button, {
            top: `${cellRect.y + 2}px`,
            left: `${cellRect.x1 + 2}px`,
        });

        button.addEventListener('click', evt => {
            const quillTable = this.quill.getModule('quill-table');
            const tableSelection = quillTable.tableSelection;
            if (tableSelection && tableSelection.selectedTds.length <= 1) {
                tableSelection.highlitSelection(cellNode);
            }
            quillTable.showTableOperationMenu(tableNode, rowNode, cellNode, evt);
        });

        this.domNode = button;
        parent.appendChild(button);
    }

    destroy() {
        if (this.domNode) {
            this.domNode.remove();
        }
        return null;
    }
}
