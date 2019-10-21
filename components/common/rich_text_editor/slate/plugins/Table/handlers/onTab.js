import {TablePosition} from "../utils";
import insertRow from "../insertRow";
import moveSelectionBy from "../moveSelectionBy";

/**
 * Select all text of current block.
 */
function selectAllText(editor) {
    const {value} = editor;
    const {start} = value;

    return editor.moveOffsetsTo(0).extend(start.text.length);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(
    event,
    editor,
    opts
) {
    event.preventDefault();
    const {value} = editor;
    const direction = event.shiftKey ? -1 : +1;

    // Create new row if needed
    const {start, selection} = value;
    const pos = TablePosition.create(opts, value.document, start.key);
    if (pos.isFirstCell() && direction === -1) {
        insertRow(opts, editor, 0);
    } else if (pos.isLastCell() && direction === 1) {
        insertRow(opts, editor);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    editor.select(selection);

    // Move
    moveSelectionBy(opts, editor, direction, 0);

    // Select all cell.
    return selectAllText(editor);
}

export default onTab;
