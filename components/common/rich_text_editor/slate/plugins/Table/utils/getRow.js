import TablePosition from "./TablePosition";

/**
 * The position of the selection start block, in the current table
 */
function getPosition(
    opts,
    // The current value
    value
) {
    return TablePosition.create(opts, value.document, value.startKey);
}

export default getPosition;
