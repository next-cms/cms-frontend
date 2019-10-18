import React, {useContext} from "react";
import {Toolbar} from "../SlateComponet";
import {renderInsertableBlockButton} from "../core";
import {RTEContext} from "../RTEContextProvider";
import {MdDelete} from "react-icons/md";

const TableToolBar = () => {
    const rteContext = useContext(RTEContext);

    // const { value } = rteContext;
    // const isInTable = isSelectionInTable(opts, value);
    // const isOutTable = isSelectionOutOfTable(opts, value);

    // if (isOutTable) return null;

    return (
        <Toolbar>
            {renderInsertableBlockButton("table_row", "R", rteContext)}
            {renderInsertableBlockButton("table_col", "C", rteContext)}
            {renderInsertableBlockButton("delete_table_row", "xR", rteContext)}
            {renderInsertableBlockButton("delete_table_col", "xC", rteContext)}
            {renderInsertableBlockButton("delete_table", <MdDelete/>, rteContext)}
        </Toolbar>
    );
};

export default TableToolBar;
