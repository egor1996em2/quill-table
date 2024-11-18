import {getRelativeRect} from 'src/utils/index';

function getColToolCellIndexByBoundary(cells, boundary, conditionFn, container) {
    return cells.reduce((findIndex, cell) => {
        let cellRect = getRelativeRect(cell.getBoundingClientRect(), container);
        if (conditionFn(cellRect, boundary)) {
            findIndex = cells.indexOf(cell);
        }
        return findIndex;
    }, false);
}

function getColToolCellIndexesByBoundary(cells, boundary, conditionFn, container) {
    return cells.reduce((findIndexes, cell) => {
        let cellRect = getRelativeRect(cell.getBoundingClientRect(), container);
        if (conditionFn(cellRect, boundary)) {
            findIndexes.push(cells.indexOf(cell));
        }
        return findIndexes;
    }, []);
}

function getElementPositionInTable(td, rows) {
    const position = {
        row: null,
        col: null,
    };

    const row = td.closest && td.closest('tr');

    const startColumnIndex = getColumnIndex(td);

    if (startColumnIndex > -1) {
        position.col = startColumnIndex;
    }

    const startRowIndex = rows.indexOf(row);

    if (startRowIndex > -1) {
        position.row = startRowIndex;
    }

    return position;
}

function getColumnIndex(target) {
    const startRow = target.closest && target.closest('tr');

    if (!startRow) {
        return -1;
    }

    return Array.from(startRow.children).indexOf(target);
}

export {getColToolCellIndexByBoundary, getColToolCellIndexesByBoundary, getElementPositionInTable};
