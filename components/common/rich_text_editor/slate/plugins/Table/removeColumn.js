import {TablePosition} from "./utils";
import removeColumnByKey from "./removeColumnByKey";

/**
 * Delete current column in a table
 */
function removeColumn(editor, opts, at) {
    const {value} = editor;
    const {start: {key}} = value;

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
