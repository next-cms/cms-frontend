/**
 * Returns the list of cells at the given row index
 */
function getCellsAtRow(
    opts,
    // The table
    table,
    rowIndex
) {
    return table.nodes.get(rowIndex).nodes;
}

export default getCellsAtRow;
