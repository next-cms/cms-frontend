import {Range} from "immutable";
import createRow from "./createRow";
import {Block} from "slate";

/**
 * Create a table
 */
function createTable(opts, columns, rows, getCellContent) {
    const rowNodes = Range(0, rows)
        .map(i =>
            createRow(
                opts,
                columns,
                getCellContent ? getCellContent.bind(null, i) : undefined
            )
        )
        .toList();

    return Block.create({
        type: opts.typeTable,
        nodes: rowNodes
    });
}

export default createTable;
