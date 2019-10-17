import removeTableByKey from "./removeTableByKey";
import isSelectionInTable from "./utils/isSelectionInTable";

/**
 * Delete the whole table at position
 */
function removeTable(editor, opts) {
    const {value} = editor;
    const {startBlock: {key}} = value;
    if (!isSelectionInTable(opts, value)) {
        return editor;
    }
    return removeTableByKey(editor, opts, key);
}

export default removeTable;
