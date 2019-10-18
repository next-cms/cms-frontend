import {TablePosition} from "./utils";
import removeRowByKey from "./removeRowByKey";
import isSelectionInTable from "./utils/isSelectionInTable";

/**
 * Remove current row in a table. Clear it if last remaining row
 */
function removeRow(editor, opts, at) {
    const {value} = editor;
    const {startBlock: {key}} = value;
    if (!isSelectionInTable(opts, value)) {
        return editor;
    }
    const pos = TablePosition.create(opts, value.document, key);

    let rowKey;
    if (typeof at === "undefined") {
        rowKey = pos.row.key;
    } else {
        rowKey = pos.table.nodes.get(at).key;
    }

    return removeRowByKey(editor, opts, rowKey);
}

export default removeRow;
