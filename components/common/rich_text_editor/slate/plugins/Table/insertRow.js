import {createRow, TablePosition} from "./utils";
import isSelectionInTable from "./utils/isSelectionInTable";

/**
 * Insert a new row in current table
 */
function insertRow(editor, opts, at, getRow) {
    const {value} = editor;
    const {startBlock} = value;
    if (!isSelectionInTable(opts, value)) {
        return editor;
    }
    const pos = TablePosition.create(opts, value.document, startBlock.key);
    const {table} = pos;

    // Create a new row with the right count of cells
    const columns = table.nodes.get(0).nodes.size;
    const newRow = getRow ? getRow(columns) : createRow(opts, columns);

    if (typeof at === "undefined") {
        at = pos.getRowIndex() + 1;
    }

    return editor
        .insertNodeByKey(table.key, at, newRow)
    // .collapseToEndOf(newRow.nodes.get(pos.getColumnIndex()));
}

export default insertRow;
