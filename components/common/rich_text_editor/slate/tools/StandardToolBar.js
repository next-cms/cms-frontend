import React, {useContext, useEffect, useState} from "react";
import {Toolbar} from "../SlateComponet";
import {opts, renderAlignmentButton, renderBlockButton, renderInsertableBlockButton, renderMarkButton} from "../core";
import {RTEContext} from "../RTEContextProvider";
import {
    MdBorderAll,
    MdBrush,
    MdCode,
    MdFlip,
    MdFormatAlignCenter,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatQuote,
    MdFormatUnderlined,
    MdInsertLink,
    MdInsertPhoto,
    MdLooksOne,
    MdLooksTwo,
    MdRemove,
    MdStrikethroughS
} from "react-icons/md";
import {Button, Checkbox, Divider, Input, Menu, Popover} from "antd";
import {isSelectionOutOfTable} from "../plugins/Table/utils";
import {renderLinkButton} from "../core/Actions/InlineButton";

const StandardToolBar = ({onSave, projectId, post}) => {

    const rteContext = useContext(RTEContext);

    const {value} = rteContext;
    const [title, setTitle] = useState();
    const [slug, setSlug] = useState(post && post.slug);
    const [isDraft, setIsDraft] = useState(post && post.isDraft);

    const isOutTable = isSelectionOutOfTable(opts, value);

    const onSaveClick = () => {

        let newPost = {
            title,
            slug,
            isDraft,
            contents: rteContext.value.toJSON(),
        };

        onSave(newPost);
    };

    useEffect(() => {
        if (!post) return;
        setSlug(post.slug);
        setIsDraft(post.isDraft);
    }, [post]);

    return (
        <div>
            <div>
                <Toolbar>
                    {renderMarkButton("bold", <MdFormatBold/>, rteContext)}
                    {renderMarkButton("italic", <MdFormatItalic/>, rteContext)}
                    {renderMarkButton("underline", <MdFormatUnderlined/>, rteContext)}
                    {renderMarkButton("code", <MdCode/>, rteContext)}
                    {renderMarkButton("mark", <MdBrush/>, rteContext)}
                    {renderMarkButton("strikethrough", <MdStrikethroughS/>, rteContext)}
                    {renderBlockButton("heading-one", <MdLooksOne/>, rteContext)}
                    {renderBlockButton("heading-two", <MdLooksTwo/>, rteContext)}
                    {renderBlockButton("block-quote", <MdFormatQuote/>, rteContext)}
                    {renderBlockButton("numbered-list", <MdFormatListNumbered/>, rteContext)}
                    {renderBlockButton("bulleted-list", <MdFormatListBulleted/>, rteContext)}
                    <Popover placement="bottom" title="Divider"
                             content={
                                 <Menu>
                                     {renderBlockButton("divider-with-text", "Divider with text", rteContext, true)}
                                     {renderBlockButton("divider", "Divider", rteContext, true)}
                                 </Menu>
                             }
                             trigger="click"
                    >
                        <Button style={{fontSize: "24px"}} shape="circle"><MdRemove/></Button>
                    </Popover>

                    {renderBlockButton("split", <MdFlip/>, rteContext)}
                    <Divider style={{height: "50px", width: "2px"}} type="vertical"/>
                    {renderLinkButton("link", <MdInsertLink/>, rteContext)}
                    {renderInsertableBlockButton("image", <MdInsertPhoto/>, rteContext)}
                    {isOutTable && renderInsertableBlockButton("table", <MdBorderAll/>, rteContext)}
                    <Divider style={{height: "50px", width: "2px"}} type="vertical"/>
                    {renderAlignmentButton("left", <MdFormatAlignLeft/>, rteContext)}
                    {renderAlignmentButton("center", <MdFormatAlignCenter/>, rteContext)}
                    {renderAlignmentButton("right", <MdFormatAlignRight/>, rteContext)}
                    <Divider style={{height: "50px", width: "2px"}} type="vertical"/>
                    <Popover placement="bottom" title="Save"
                             content={
                                 <div>
                                     <Input placeholder="Slug" onChange={(e) => setSlug(e.target.value)} value={slug}/>
                                     <Checkbox
                                         checked={isDraft}
                                         onChange={(e) => setIsDraft(!isDraft)}
                                     >
                                         Draft
                                     </Checkbox>
                                     <Button type="primary" shape="round"
                                             onClick={onSaveClick}>Save</Button>
                                 </div>
                             }
                             trigger="click"
                    >
                        <Button type="primary" shape="round">Publish</Button>
                    </Popover>
                </Toolbar>
            </div>
            <div>
                <Input placeholder="Title" allowClear onChange={(e) => setTitle(e.target.value)}/>
            </div>
        </div>
    );
};

export default StandardToolBar;
