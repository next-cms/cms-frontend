import {TablePosition} from "../utils";
import {Block} from "slate";

/**
 * Exit the current table, by inserting a default block after the table.
 */
function onModEnter(
    event,
    editor,
    opts
) {
    const {value} = editor;
    if (!value.isCollapsed) {
        return undefined;
    }

    event.preventDefault();

    const exitBlock = Block.create({
        type: opts.exitBlockType,
        nodes: [Text.create("")]
    });

    const table = TablePosition.create(opts, value.document, value.start.key)
        .table;
    const tableParent = value.document.getParent(table.key);
    const insertionIndex = tableParent.nodes.indexOf(table) + 1;

    return editor
        .insertNodeByKey(tableParent.key, insertionIndex, exitBlock)
        .collapseToStartOf(exitBlock);
}

export default onModEnter;
