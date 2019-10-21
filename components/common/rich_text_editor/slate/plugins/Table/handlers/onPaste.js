import {isRangeInTable, isSelectionInTable} from "../utils";
import insertTableFragmentAtRange from "../insertTableFragmentAtRange";
import {getEventTransfer} from "slate-react";

/**
 *  Handle pasting inside tables
 */
function onPaste(
    // The plugin options
    opts,
    event,
    editor
) {
    // Outside of tables, do not alter paste behavior
    if (!isSelectionInTable(opts, editor.value)) {
        return undefined;
    }

    const transfer = getEventTransfer(event);
    const {type, fragment} = transfer;

    if (type !== "fragment" || fragment.nodes.isEmpty()) {
        return null;
    }

    if (
        !isRangeInTable(
            opts,
            fragment,
            Range.create({
                anchorKey: fragment.getFirstText().key,
                focusKey: fragment.getLastText().key
            })
        )
    ) {
        return null;
    }

    return insertTableFragmentAtRange(
        opts,
        editor,
        editor.value.selection,
        fragment
    );
}

export default onPaste;
