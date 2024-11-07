# Описание
`@tilda/quill-table` - это расширенная версия плагина таблиц для редактора `Quill`, предоставляющая полный набор функций для редактрирования таблиц. Позволяет пользователю создавать, редактировать и форматировать таблицы.

Этот пакет базируется на последней доступной версии оригинального пакета `quill-better-table`, с добавлением нескольких новых функций и исправлением некоего количества извеснтных проблем.

## Требования

[quilljs](https://github.com/quilljs/quill) v2.0.0-dev.3

# Установка

Пакет доступен в нашем registry.

# Использование

Для использования пакета устанавливаем его как зависимость из нашего registry

```bash
npm install @tilda/quill-table
```

Подключаем файл стилей в месте использования

```javascript
import '@tilda/quill-table/style.css';
```
Подключаем модуль к инстансу `Quill` и включаем табличные форматы

```javascript
import QuillTable from '@tilda/quill-table';

Quill.register({
	'modules/quill-table': QuillTable,
});

const quill = new Quill('#editor-wrapper', {
    modules: {
		// отключаем базовый модуль таблиц
        table: false,
		// подключаем quill-table
        'quill-table': true,
		// добавляем поддержку клавиатуры для работы  стаблицами
        keyboard: {
            bindings: QuillTable.keyboardBindings,
        },
    },
	formats: [
		// подключаем табличные форматы
		...QuillTable.requiredTableFormats,
	],
});
```

## ES6

```javascript
// подклбчаем библиотеку
import QuillTable from '@tilda/quill-table';
// подключаем стили библиотеки
import '@tilda/quill-table/style.css';

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
