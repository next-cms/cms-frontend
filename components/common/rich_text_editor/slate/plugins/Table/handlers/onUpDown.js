import {TablePosition} from "../utils";
import moveSelectionBy from "../moveSelectionBy";

function onUpDown(
    event,
    editor,
    opts
) {
    const {value} = editor;
    const direction = event.key === "ArrowUp" ? -1 : +1;
    const pos = TablePosition.create(opts, value.document, value.start.key);

    if (
        (pos.isFirstRow() && direction === -1) ||
        (pos.isLastRow() && direction === +1)
    ) {
        // Let the default behavior move out of the table
        return undefined;
    }

    if (direction === -1 && !pos.isTopOfCell()) {
        return undefined;
    }

    if (direction === +1 && !pos.isBottomOfCell()) {
        return undefined;
    }

    event.preventDefault();

    moveSelectionBy(opts, editor, 0, direction);

    return editor;
}

export default onUpDown;
