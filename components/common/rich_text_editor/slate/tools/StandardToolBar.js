import React, {useContext} from "react";
import {Toolbar} from "../SlateComponet";
import {renderBlockButton, renderInsertableBlockButton, renderMarkButton} from "../core";
import {RTEContext} from "../RTEContextProvider";

const StandardToolBar = () => {
    const rteContext = useContext(RTEContext);

    return (
        <Toolbar>
            {renderMarkButton("bold", "bold", rteContext)}
            {renderMarkButton("italic", "italic", rteContext)}
            {renderMarkButton("underline", "underline", rteContext)}
            {renderMarkButton("code", "code", rteContext)}
            {renderMarkButton("strikethrough", "strikethrough", rteContext)}
            {renderBlockButton("heading-one", "looks_one", rteContext)}
            {renderBlockButton("heading-two", "looks_two", rteContext)}
            {renderBlockButton("block-quote", "format_quote", rteContext)}
            {renderBlockButton("numbered-list", "ordered-list", rteContext)}
            {renderBlockButton("bulleted-list", "unordered-list", rteContext)}
            {renderInsertableBlockButton("image", "image", rteContext)}
            {renderInsertableBlockButton("table", "table", rteContext)}
        </Toolbar>
    );
};

export default StandardToolBar;
