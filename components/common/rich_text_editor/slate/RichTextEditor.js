import React from "react";

import StandardToolBar from "./tools/StandardToolBar.js";
import RTEContextProvider from "./RTEContextProvider";
import EditorCore from "./core/EditorCore";

// eslint-disable-next-line react/prop-types
const RichTextEditor = ({ onSave }) => {

    const _onSave = (value) => {
        onSave(value);
    };

    return (
        <RTEContextProvider>
            <StandardToolBar
                onSave={_onSave}
            />
            {/*<TableToolBar/>*/}
            <EditorCore />
        </RTEContextProvider>
    );
};

export default RichTextEditor;
