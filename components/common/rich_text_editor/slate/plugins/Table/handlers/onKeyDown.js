import {isSelectionInTable} from "../utils";

import onEnter from "./onEnter";
import onModEnter from "./onModEnter";
import onTab from "./onTab";
import onBackspace from "./onBackspace";
import onUpDown from "./onUpDown";

const KEY_ENTER = "Enter";
const KEY_TAB = "Tab";
const KEY_BACKSPACE = "Backspace";
const KEY_DOWN = "ArrowDown";
const KEY_UP = "ArrowUp";

/**
 * User is pressing a key in the editor
 */
function onKeyDown(
    opts,
    event,
    editor
) {
    // Only handle events in cells
    if (!isSelectionInTable(opts, editor.value)) {
        return undefined;
    }

    // Build arguments list
    const args = [event, editor, opts];

    switch (event.key) {
        case KEY_ENTER:
            if (event.metaKey && opts.exitBlockType) {
                return onModEnter(...args);
            }
            return onEnter(...args);

        case KEY_TAB:
            return onTab(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown(...args);
        default:
            return undefined;
    }
}

export default onKeyDown;
