import isRangeInTable from "./isRangeInTable";

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts, value) {
    if (!value.selection.startKey) return false;
    return isRangeInTable(opts, value.document, value.selection);
}

export default isSelectionInTable;
