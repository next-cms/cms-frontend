/**
 * Clear the content of the given cell
 */
import {Block} from "slate";

function clearCell(editor, opts, cell) {
    const newBlock = Block.create({type: opts.typeContent});
    const {nodes} = cell;

    // Insert a new empty node
    editor.insertNodeByKey(cell.key, 0, newBlock, {normalize: false});

    // Remove all previous nodes
    nodes.forEach(node => {
        editor.removeNodeByKey(node.key);
    });

    editor.normalizeNodeByKey(cell.key);

    return editor;
}

export default clearCell;
