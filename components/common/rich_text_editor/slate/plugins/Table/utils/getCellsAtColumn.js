/**
 * Returns the list of cells at the given column index
 */
function getCellsAtColumn(opts, table, columnIndex) {
    return table.nodes.map(row => row.nodes.get(columnIndex));
}

export default getCellsAtColumn;
