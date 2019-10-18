import TablePosition from "./TablePosition";

/*
 * The position of a particular node, in the current table
 */
function getPositionByKey(
    opts,
    // The current value
    containerNode,
    // Key of the node in desired position
    key
) {
    return TablePosition.create(opts, containerNode, key);
}

export default getPositionByKey;
