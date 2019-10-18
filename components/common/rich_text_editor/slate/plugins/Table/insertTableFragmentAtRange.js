import {TablePosition} from "./utils";
import insertColumn from "./insertColumn";
import insertRow from "./insertRow";

/**
 * Used when pasting a fragment of table into another one
 */
function insertTableFragmentAtRange(editor, opts, range, fragment) {
    const insertedTable = fragment.nodes.first();
    if (
        !(
            fragment.nodes.size === 1 &&
            insertedTable &&
            insertedTable.type === opts.typeTable
        )
    ) {
        throw new Error("Expected to insert a fragment containing one table");
    }

    const {value} = editor;
    const targetPosition = TablePosition.create(
        opts,
        value.document,
        value.selection.start.key
    );

    const fragmentRows = insertedTable.nodes;
    const fragmentHeight = fragmentRows.size;
    const fragmentWidth = fragmentRows.first().nodes.size;

    // Insert columns and rows to accomodate the incoming pasted cells
    const missingWidth =
        fragmentWidth +
        targetPosition.getColumnIndex() -
        targetPosition.getWidth();
    const missingHeight =
        fragmentHeight +
        targetPosition.getRowIndex() -
        targetPosition.getHeight();

    if (missingWidth > 0) {
        // Add columns
        Array(missingWidth)
            .fill()
            .forEach(() => {
                insertColumn(editor, opts, targetPosition.getWidth());
            });
    }
    if (missingHeight > 0) {
        // Add rows
        Array(missingHeight)
            .fill()
            .forEach(() => {
                insertRow(editor, opts, targetPosition.getHeight());
            });
    }

    // Patch the inserted table over the target table, overwritting the cells
    const existingTable = editor.value.document.getDescendant(
        targetPosition.table.key
    );

    fragmentRows.forEach((fragmentRow, fragmentRowIndex) => {
        fragmentRow.nodes.forEach((newCell, fragmentColumnIndex) => {
            const existingCell = existingTable.nodes
                .get(targetPosition.getRowIndex() + fragmentRowIndex)
                .nodes.get(
                    targetPosition.getColumnIndex() + fragmentColumnIndex
                );

            editor.replaceNodeByKey(existingCell.key, newCell, {
                normalize: false
            });
        });
    });

    const lastPastedCell = fragmentRows.last().nodes.last();
    return editor.collapseToEndOf(lastPastedCell);
}

export default insertTableFragmentAtRange;
