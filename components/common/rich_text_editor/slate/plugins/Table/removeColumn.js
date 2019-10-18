import {TablePosition} from "./utils";
import removeColumnByKey from "./removeColumnByKey";
import isSelectionInTable from "./utils/isSelectionInTable";

/**
 * Delete current column in a table
 */
function removeColumn(editor, opts, at) {
    const {value} = editor;
    const {startBlock: {key}} = value;

    if (!isSelectionInTable(opts, value)) {
        return editor;
    }

    const pos = TablePosition.create(opts, value.document, key);

    let columnKey;
    if (typeof at === "undefined") {
        columnKey = pos.cell.key;
    } else {
        columnKey = pos.row.nodes.get(at).key;
    }

    return removeColumnByKey(editor, opts, columnKey);
}

export default removeColumn;
