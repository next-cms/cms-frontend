/**
 * Create a new cell
 */
import {Block, Text} from "slate";

function createCell(opts, nodes) {
    return Block.create({
        type: opts.typeCell,
        nodes: nodes || [createEmptyContent(opts)]
    });
}

/**
 * Create a new default content block
 */
function createEmptyContent(opts) {
    return Block.create({
        type: opts.typeContent,
        nodes: [Text.create()]
    });
}

export default createCell;
