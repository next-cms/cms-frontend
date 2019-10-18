import {TablePosition} from "./utils";

/**
 * Move selection to {x,y}
 */
function moveSelection(editor, opts, x, y) {
    const {value} = editor;
    const {startBlock: {key}} = value;
    const pos = TablePosition.create(opts, value.document, key);

    if (!pos.isInCell()) {
        throw new Error("moveSelection can only be applied from within a cell");
    }

    const {table} = pos;
    const row = table.nodes.get(y);
    const cell = row.nodes.get(x);

    // return editor.collapseToStartOf(cell);
    return editor;
}

export default moveSelection;
