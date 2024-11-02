import QuillTable from '../../src/quill-table';
// import better-table styles file
import 'src/assets/quill-table.less';

Quill.register(
    {
        'modules/quill-table': QuillTable,
    },
    true
);

window.onload = () => {
    const quill = new Quill('#editor-wrapper', {
        theme: 'snow',
        modules: {
            table: false,
            'quill-table': {
                operationMenu: {
                    items: {
                        unmergeCells: {
                            text: 'Another unmerge cells name',
                        },
                    },

                    color: {
                        colors: ['red', 'green', 'yellow', 'white', 'gold', 'cadetblue', 'darkseagreen', 'skyblue'],
                    },
                },
            },
            keyboard: {
                bindings: QuillTable.keyboardBindings,
            },
        },
    });

    let tableModule = quill.getModule('quill-table');
    document.body.querySelector('#insert-table').onclick = () => {
        tableModule.insertTable(3, 3);
    };

    document.body.querySelector('#get-table').onclick = () => {
        console.info(tableModule.getTable());
    };

    document.body.querySelector('#get-contents').onclick = () => {
        console.info(quill.getContents());
    };

    document.body.querySelector('#insert-column-right').onclick = () => {
        tableModule.insertColumnRight();
    };

    document.body.querySelector('#insert-column-left').onclick = () => {
        tableModule.insertColumnLeft();
    };

    document.body.querySelector('#insert-row-above').onclick = () => {
        tableModule.insertRowAbove();
    };

    document.body.querySelector('#insert-row-below').onclick = () => {
        tableModule.insertRowBelow();
    };

    document.body.querySelector('#delete-column').onclick = () => {
        tableModule.deleteColumn();
    };

    document.body.querySelector('#delete-row').onclick = () => {
        tableModule.deleteRow();
    };

    document.body.querySelector('#delete-table').onclick = () => {
        tableModule.deleteTable();
    };
};
