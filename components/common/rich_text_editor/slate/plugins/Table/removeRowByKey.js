import {TablePosition} from "./utils";
import clearCell from "./clearCell";

/**
 * Remove the row associated to a given key in a table.
 * Clear thw row if last remaining row
 */
function removeRowByKey(editor, opts, key) {
    const {value} = editor;
    const pos = TablePosition.create(opts, value.document, key);

    // Update table by removing the row
    if (pos.getHeight() > 1) {
        editor.removeNodeByKey(key);
    } else {
        // If last remaining row, clear it instead
        pos.row.nodes.forEach(cell => {
            cell.nodes.forEach(node => clearCell(editor, opts, cell));
        });
    }

    return editor;
}

export default removeRowByKey;
