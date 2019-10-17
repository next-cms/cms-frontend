import {getCopiedFragment} from "../utils";
import {cloneFragment} from "slate-react";

/**
 *  Handle copying content of tables
 */
function onCopy(
    // The plugin options
    opts,
    event,
    editor
) {
    const copiedFragment = getCopiedFragment(opts, editor.value);

    if (!copiedFragment) {
        // Default copy behavior
        return null;
    }

    // Override default onCopy
    cloneFragment(event, editor.value, copiedFragment);
    return true;
}

export default onCopy;
