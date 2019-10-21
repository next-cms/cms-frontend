import {TablePosition} from "../utils";
import insertRow from "../insertRow";

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(
    event,
    editor,
    opts
) {
    event.preventDefault();
    const {selection, document} = editor.value;
    const pos = TablePosition.create(opts, document, selection.start.key);

    if (
        !selection.hasFocusAtStartOf(pos.cell) &&
        !selection.hasFocusAtEndOf(pos.cell)
    ) {
        return undefined;
    }

    if (event.shiftKey) {
        return editor
            .splitBlock()
            .setBlocks({type: opts.typeContent, data: {}});
    }

    return insertRow(opts, editor);
}

export default onEnter;
