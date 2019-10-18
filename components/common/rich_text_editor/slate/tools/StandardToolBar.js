import React, { useContext, useState } from "react";
import { Toolbar } from "../SlateComponet";
import { opts, renderAlignmentButton, renderBlockButton, renderInsertableBlockButton, renderMarkButton } from "../core";
import { RTEContext } from "../RTEContextProvider";
import {
    MdBorderAll,
    MdCode,
    MdFormatAlignCenter,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatQuote,
    MdFormatUnderlined,
    MdInsertPhoto,
    MdLooksOne,
    MdLooksTwo,
    MdStrikethroughS,
    MdInsertLink
} from "react-icons/md";
import { Button, Divider, Input } from "antd";
import { isSelectionOutOfTable } from "../plugins/Table/utils";
import { renderLinkButton } from "../core/Actions/InlineButton";

const StandardToolBar = ({ onSave }) => {

    const rteContext = useContext(RTEContext);

    const { value } = rteContext;
    const [title, setTitle] = useState();
    
    const isOutTable = isSelectionOutOfTable(opts, value);

    const onSaveClick = () => {
        
        let post = {
            title,
            content: rteContext.value.toJSON()
        }
        
        onSave(post);
    };

    return (
        <div>
            <div>
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
                    {renderBlockButton("split", "split", rteContext)}
                    <Divider style={{ height: "50px", width: "2px" }} type="vertical" />
                    {renderLinkButton("link", <MdInsertLink />, rteContext)}
                    <Divider style={{ height: "50px", width: "2px" }} type="vertical" />
                    {renderInsertableBlockButton("image", <MdInsertPhoto />, rteContext)}
                    {isOutTable && renderInsertableBlockButton("table", <MdBorderAll />, rteContext)}
                    {renderAlignmentButton("left", <MdFormatAlignLeft />, rteContext)}
                    {renderAlignmentButton("center", <MdFormatAlignCenter />, rteContext)}
                    {renderAlignmentButton("right", <MdFormatAlignRight />, rteContext)}
                    <Divider style={{ height: "50px", width: "2px" }} type="vertical" />
                    <Button type="primary" shape="round" onClick={onSaveClick}>Save</Button>
                </Toolbar>
            </div>
            <div>
                <Input placeholder="Title" allowClear onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>
    );
};

export default StandardToolBar;
