import TablePosition from "./TablePosition";

/**
 * True if the given range is inside one table
 */
function isRangeInTable(opts, node, range) {
    const {start, end} = range;
    const startPosition = TablePosition.create(opts, node, start.key);
    const endPosition = TablePosition.create(opts, node, end.key);

    // Only handle events in tables
    if (!startPosition.isInTable() || !endPosition.isInTable()) {
        return false;
    }

    // Inside the same table
    return startPosition.table === endPosition.table;
}

export default isRangeInTable;
