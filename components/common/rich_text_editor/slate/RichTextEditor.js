import React from "react";

import StandardToolBar from "./tools/StandardToolBar.js";
import RTEContextProvider from "./RTEContextProvider";
import EditorCore from "./core/EditorCore";

const RichTextEditor = () => {
    return (
        <RTEContextProvider>
            <StandardToolBar/>
            <EditorCore/>
        </RTEContextProvider>
    );
};

export default RichTextEditor;
