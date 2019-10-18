import {createTable} from "./utils";

/**
 * Insert a new table
 */
function insertTable(editor, opts, columns = 2, rows = 2, getCellContent) {
    const {value} = editor;

    if (!value.selection.start.key) return editor;

    // Create the table node
    const table = createTable(opts, columns, rows, getCellContent);

    return editor.insertBlock(table);
}

export default insertTable;
