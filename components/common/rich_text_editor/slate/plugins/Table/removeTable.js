import removeTableByKey from "./removeTableByKey";

/**
 * Delete the whole table at position
 */
function removeTable(editor, opts) {
    const {value} = editor;
    const {start: {key}} = value;

    return removeTableByKey(editor, opts, key);
}

export default removeTable;
