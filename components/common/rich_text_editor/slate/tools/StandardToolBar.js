import React, {useContext} from "react";
import {Toolbar} from "../SlateComponet";
import {renderBlockButton, renderInsertableBlockButton, renderMarkButton, renderAlignmentButton} from "../core";
import {RTEContext} from "../RTEContextProvider";
import { MdLooksOne, MdLooksTwo, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdCode, MdStrikethroughS, MdFormatQuote, MdFormatListBulleted, MdFormatListNumbered, MdInsertPhoto, MdBorderAll, MdFormatAlignCenter, MdFormatAlignLeft, MdFormatAlignRight } from "react-icons/md";

const StandardToolBar = () => {
    const rteContext = useContext(RTEContext);

    return (
        <Toolbar>
            {renderMarkButton("bold", <MdFormatBold />, rteContext)}
            {renderMarkButton("italic", <MdFormatItalic />, rteContext)}
            {renderMarkButton("underline", <MdFormatUnderlined />, rteContext)}
            {renderMarkButton("code", <MdCode />, rteContext)}
            {renderMarkButton("strikethrough", <MdStrikethroughS />, rteContext)}
            {renderBlockButton("heading-one", <MdLooksOne />, rteContext)}
            {renderBlockButton("heading-two", <MdLooksTwo />, rteContext)}
            {renderBlockButton("block-quote", <MdFormatQuote />, rteContext)}
            {renderBlockButton("numbered-list", <MdFormatListNumbered />, rteContext)}
            {renderBlockButton("bulleted-list", <MdFormatListBulleted />, rteContext)}
            {renderInsertableBlockButton("image", <MdInsertPhoto />, rteContext)}
            {renderInsertableBlockButton("table", <MdBorderAll />, rteContext)}
            {renderAlignmentButton("left", <MdFormatAlignLeft />, rteContext)}
            {renderAlignmentButton("center", <MdFormatAlignCenter />, rteContext)}
            {renderAlignmentButton("right", <MdFormatAlignRight />, rteContext)}
        </Toolbar>
    );
};

export default StandardToolBar;
