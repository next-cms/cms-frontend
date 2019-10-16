import {createRow, TablePosition} from "./utils";

/**
 * Insert a new row in current table
 */
function insertRow(editor, opts, at, getRow) {
    const {value} = editor;
    const {startKey} = value;

    const pos = TablePosition.create(opts, value.document, startKey);
    const {table} = pos;

    // Create a new row with the right count of cells
    const columns = table.nodes.get(0).nodes.size;
    const newRow = getRow ? getRow(columns) : createRow(opts, columns);

    if (typeof at === "undefined") {
        at = pos.getRowIndex() + 1;
    }

    return editor
        .insertNodeByKey(table.key, at, newRow)
        .collapseToEndOf(newRow.nodes.get(pos.getColumnIndex()));
}

export default insertRow;
