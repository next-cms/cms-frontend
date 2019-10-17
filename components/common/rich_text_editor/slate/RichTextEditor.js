import React from "react";

import StandardToolBar from "./tools/StandardToolBar.js";
import RTEContextProvider from "./RTEContextProvider";
import EditorCore from "./core/EditorCore";

const RichTextEditor = () => {

    const onSave = (value) => {
        console.log(value);
    };

    return (
        <RTEContextProvider>
            <StandardToolBar
                onSave={onSave}
            />
            {/*<TableToolBar/>*/}
            <EditorCore />
        </RTEContextProvider>
    );
};

export default RichTextEditor;
