import {Record} from "immutable";

class TablePosition extends Record({
    tableBlock: null,
    rowBlock: null,
    cellBlock: null,
    contentBlock: null
}) {
    // // Block container for the table
    // tableBlock;
    //
    // // Block for current row
    // rowBlock;
    //
    // // Block for current cell
    // cellBlock;
    //
    // // Current content block in the cell
    // contentBlock;

    /**
     * Create a new instance of a TablePosition from a Slate document
     * and a node key.
     */
    static create(
        opts,
        containerNode,
        key
    ) {
        const node = containerNode.getDescendant(key);
        const ancestors = containerNode.getAncestors(key).push(node);
        const tableBlock = ancestors.findLast(p => p && p.type === opts.typeTable);
        const rowBlock = ancestors.findLast(p => p && p.type === opts.typeRow);

        const cellBlock = ancestors.findLast(p => p && p.type === opts.typeCell);
        const contentBlock = ancestors
            .skipUntil(ancestor => ancestor === cellBlock)
            .skip(1)
            .first();

        return new TablePosition({
            tableBlock,
            rowBlock,
            cellBlock,
            contentBlock
        });
    }

    get table() {
        if (!this.tableBlock) {
            throw new Error("Not in a table");
        }
        return this.tableBlock;
    }

    get row() {
        if (!this.rowBlock) {
            throw new Error("Not in a row");
        }
        return this.rowBlock;
    }

    get cell() {
        if (!this.cellBlock) {
            throw new Error("Not in a cell");
        }
        return this.cellBlock;
    }

    /**
     * Check to see if this position is within a cell
     */
    isInCell() {
        return Boolean(this.cellBlock);
    }

    /**
     * Check to see if this position is within a row
     */
    isInRow() {
        return Boolean(this.rowBlock);
    }

    /**
     * Check to see if this position is within a table
     */
    isInTable() {
        return Boolean(this.tableBlock);
    }

    /**
     * Check to see if this position is at the top of the cell.
     */
    isTopOfCell() {
        const {contentBlock, cellBlock} = this;

        if (!contentBlock || !cellBlock) {
            return false;
        }

        const {nodes} = cellBlock;
        const index = nodes.findIndex(block => block.key === contentBlock.key);

        return index === 0;
    }

    /**
     * Check to see if this position is at the bottom of the cell.
     */
    isBottomOfCell() {
        const {contentBlock, cellBlock} = this;

        if (!contentBlock || !cellBlock) {
            return false;
        }

        const {nodes} = cellBlock;
        const index = nodes.findIndex(block => block.key === contentBlock.key);

        return index === nodes.size - 1;
    }

    /**
     * Get count of columns
     */
    getWidth() {
        const {table} = this;
        const rows = table.nodes;
        const cells = rows.first().nodes;

        return cells.size;
    }

    /**
     * Get count of rows
     */
    getHeight() {
        const {table} = this;
        const rows = table.nodes;

        return rows.size;
    }

    /**
     * Get index of current row in the table.
     */
    getRowIndex() {
        const {table, row} = this;
        const rows = table.nodes;

        return rows.findIndex(x => x === row);
    }

    /**
     * Get index of current column in the row.
     */
    getColumnIndex() {
        const {row, cell} = this;
        const cells = row.nodes;

        return cells.findIndex(x => x === cell);
    }

    /**
     * True if on first cell of the table
     */
    isFirstCell() {
        return this.isFirstRow() && this.isFirstColumn();
    }

    /**
     * True if on last cell of the table
     */
    isLastCell() {
        return this.isLastRow() && this.isLastColumn();
    }

    /**
     * True if on first row
     */
    isFirstRow() {
        return this.getRowIndex() === 0;
    }

    /**
     * True if on last row
     */
    isLastRow() {
        return this.getRowIndex() === this.getHeight() - 1;
    }

    /**
     * True if on first column
     */
    isFirstColumn() {
        return this.getColumnIndex() === 0;
    }

    /**
     * True if on last column
     */
    isLastColumn() {
        return this.getColumnIndex() === this.getWidth() - 1;
    }
}

export default TablePosition;
