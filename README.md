# Описание
`quill-table` - это расширенная версия плагина таблиц для редактора `Quill`, предоставляющая полный набор функций для редактрирования таблиц. Позволяет пользователю создавать, редактировать и форматировать таблицы.

Этот пакет базируется на последней доступной версии оригинального пакета `quill-better-table`, с добавлением нескольких новых функций и исправлением некоего количества извеснтных проблем.

## Требования

[quilljs](https://github.com/quilljs/quill) v2.0.0-dev.3

# Установка

Пакет доступен в нашем registry.

# Использование

Добавить `Quill` и файлы стилей

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.min.js" type="text/javascript"></script>
```

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.snow.min.css" rel="stylesheet" />
<link href="https://unpkg.com/quill-better-table-plus@0.1.3/dist/quill-better-table-plus.css" rel="stylesheet" />
```

## ES6

```javascript
import QuillTable from 'quill-table';

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
            table: false, // disable table module
            'quill-table': {
                operationMenu: {
                    items: {
                        unmergeCells: {
                            text: 'Another unmerge cells name',
                        },
                    },
                },
            },
            keyboard: {
                bindings: QuillTable.keyboardBindings,
            },
        },
    });

    document.body.querySelector('#insert-table').onclick = () => {
        let tableModule = quill.getModule('quill-table');
        tableModule.insertTable(3, 3);
    };
};
```
