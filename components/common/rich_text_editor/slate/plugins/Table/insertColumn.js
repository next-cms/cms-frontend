import {createCell, TablePosition} from "./utils";
import moveSelection from "./moveSelection";

/**
 * Insert a new column in current table
 */
function insertColumn(editor, opts, at, getCell) {
    const {value} = editor;
    const {startKey} = value;

    const pos = TablePosition.create(opts, value.document, startKey);
    const {table} = pos;

    const columnIndex =
        typeof at === "undefined" ? pos.getColumnIndex() + 1 : at;

    // Insert the new cell
    table.nodes.forEach((row, rowIndex) => {
        const newCell = getCell
            ? getCell(columnIndex, rowIndex)
            : createCell(opts);
        editor.insertNodeByKey(row.key, columnIndex, newCell, {
            normalize: false
        });
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(editor, opts,
        pos.getColumnIndex() + 1,
        pos.getRowIndex()
    );
}

export default insertColumn;
