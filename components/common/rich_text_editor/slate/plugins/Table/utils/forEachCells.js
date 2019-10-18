/**
 * Run the given function against each cells of the table
 */
function forEachCells(opts, table, fn) {
    return table.nodes.forEach((row, rowIndex) =>
        row.nodes.forEach((cell, columnIndex) =>
            fn(cell, rowIndex, columnIndex)
        )
    );
}

export default forEachCells;
