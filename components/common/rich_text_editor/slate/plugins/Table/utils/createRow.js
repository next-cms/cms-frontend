import {Range} from "immutable";
import createCell from "./createCell";
import {Block} from "slate";

/**
 * Create a new row block
 */
function createRow(opts, columns, getCellContent) {
    const cellNodes = Range(0, columns)
        .map(i =>
            createCell(opts, getCellContent ? getCellContent(i) : undefined)
        )
        .toList();

    return Block.create({
        type: opts.typeRow,
        nodes: cellNodes
    });
}

export default createRow;
