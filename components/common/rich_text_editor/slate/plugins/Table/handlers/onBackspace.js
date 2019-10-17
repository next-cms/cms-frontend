import clearCell from "../clearCell";

function onBackspace(
    event,
    editor,
    opts
) {
    const {value} = editor;
    const {start, end, selection, document} = value;

    const startCell = document.getClosest(start.key, opts.isCell);
    const endCell = document.getClosest(end.key, opts.isCell);

    const startBlockIndex = startCell.nodes.findIndex(
        block => block.key === start.key
    );

    // If a cursor is collapsed at the start of the first block, do nothing
    if (startBlockIndex === 0 && selection.isAtStartOf(start)) {
        if (start.isVoid) {
            // Delete the block normally if it is a void block
            return undefined;
        }

        event.preventDefault();
        return editor;
    }

    // If "normal" deletion, we continue
    if (startCell === endCell) {
        return undefined;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the cells.
    event.preventDefault();

    const {blocks} = value;

    // Get all cells that contains the selection
    const cells = blocks
        .map(
            node =>
                node.type === opts.typeCell
                    ? node
                    : document.getClosest(
                    node.key,
                    a => a.type === opts.typeCell
                    )
        )
        .toSet();

    // If the cursor is at the very end of the first cell, ignore it.
    // If the cursor is at the very start of the last cell, ignore it.
    // This behavior is to compensate hanging selection behaviors:
    // https://github.com/ianstormtaylor/slate/pull/1605
    const ignoreFirstCell = value.selection
        .collapseToStart()
        .isAtEndOf(cells.first());
    const ignoreLastCell = value.selection
        .collapseToEnd()
        .isAtStartOf(cells.last());

    let cellsToClear = cells;
    if (ignoreFirstCell) {
        cellsToClear = cellsToClear.rest();
    }
    if (ignoreLastCell) {
        cellsToClear = cellsToClear.butLast();
    }

    // Clear all the selection
    cellsToClear.forEach(cell => clearCell(opts, editor, cell));

    // Update the selection properly, and avoid reset of selection
    const updatedStartCell = editor.value.document.getDescendant(
        cellsToClear.first().key
    );
    return editor.collapseToStartOf(updatedStartCell);
}

export default onBackspace;
