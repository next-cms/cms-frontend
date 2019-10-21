import React, { useContext, Fragment } from "react";
import { Toolbar } from "../SlateComponet";
import { renderInsertableBlockButton } from "../core";
import { RTEContext } from "../RTEContextProvider";
import { MdDelete, MdExposureNeg1, MdExposurePlus1 } from "react-icons/md";

const TableToolBar = () => {
    const rteContext = useContext(RTEContext);

    // const { value } = rteContext;
    // const isInTable = isSelectionInTable(opts, value);
    // const isOutTable = isSelectionOutOfTable(opts, value);

    // if (isOutTable) return null;

    return (
        <div style={{
            display: "flex"
        }}>
            <div style={{margin: "0 10px"}}>
                <p>Row</p>
                {renderInsertableBlockButton("table_row", <MdExposurePlus1 />, rteContext)}
                &nbsp;
                {renderInsertableBlockButton("delete_table_row", <MdExposureNeg1 />, rteContext)}
            </div>
            <div style={{margin: "0 10px"}}>
                <p>Col</p>
                {renderInsertableBlockButton("table_col", <MdExposurePlus1 />, rteContext)}
                &nbsp;
                {renderInsertableBlockButton("delete_table_col", <MdExposureNeg1 />, rteContext)}
            </div>
            <div style={{margin: "0 10px"}}>
                <p>Extra</p>
                {renderInsertableBlockButton("delete_table", <MdDelete />, rteContext)}
            </div>
        </div>
    );
};

export default TableToolBar;
