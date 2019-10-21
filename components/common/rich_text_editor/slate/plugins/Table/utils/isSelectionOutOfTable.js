import TablePosition from "./TablePosition";

/**
 * Are the selection start and end outside a table.
 */
function isSelectionOutOfTable(opts, value) {
    if (!value.selection.start) return false;

    const {start, end} = value.selection;

    const startPosition = TablePosition.create(opts, value.document, start && start.key);
    const endPosition = TablePosition.create(opts, value.document, end && end.key);

    // Only handle events in tables
    return !startPosition.isInTable() && !endPosition.isInTable();
}

export default isSelectionOutOfTable;
