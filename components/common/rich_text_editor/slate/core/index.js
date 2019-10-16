import {Button} from "antd";
import insertImage from "../plugins/Image";
import React from "react";

const DEFAULT_NODE = "paragraph";

export const hasMark = (type, value) => {
    return value.activeMarks.some(mark => mark.type === type);
};

export const hasBlock = (type, value) => {
    return value.blocks.some(node => node.type === type);
};


export const onClickMark = (event, type, {editor}) => {
    event.preventDefault();
    editor.toggleMark(type);
};

const onClickInsertable = (event, type, {value, editor, showModal}) => {
    event.preventDefault();

    if (type === "image") {
        showModal().then((photo) => {
            console.log("selected image:", photo);
            const src = photo.src;
            if (!src) return;
            editor.command(insertImage, src);
        }).catch(e => console.log(e.message));
    }
};

const onClickBlock = (event, type, {value, editor}) => {
    event.preventDefault();

    const {document} = value;

    if (type !== "bulleted-list" && type !== "numbered-list") {
        const isActive = hasBlock(type, value);
        const isList = hasBlock("list-item", value);

        if (isList) {
            editor
                .setBlocks(isActive ? DEFAULT_NODE : type)
                .unwrapBlock("bulleted-list")
                .unwrapBlock("numbered-list");
        } else {
            editor.setBlocks(isActive ? DEFAULT_NODE : type);
        }
    } else {
        // Handle the extra wrapping required for list buttons.
        const isList = hasBlock("list-item", value);
        const isType = value.blocks.some(block => {
            return !!document.getClosest(block.key, parent => parent.type === type);
        });

        if (isList && isType) {
            editor
                .setBlocks(DEFAULT_NODE)
                .unwrapBlock("bulleted-list")
                .unwrapBlock("numbered-list");
        } else if (isList) {
            editor
                .unwrapBlock(
                    type === "bulleted-list" ? "numbered-list" : "bulleted-list"
                )
                .wrapBlock(type);
        } else {
            editor.setBlocks("list-item").wrapBlock(type);
        }
    }
};


export const renderMarkButton = (type, icon, {value, editor}) => {
    const isActive = hasMark(type, value);

    return (
        <Button
            type={isActive ? "primary" : "default"}
            onMouseDown={event => onClickMark(event, type, {editor})}
        >
            {icon}
        </Button>
    );
};

export const renderBlockButton = (type, icon, {value, editor}) => {
    let isActive = hasBlock(type, value);

    if (["numbered-list", "bulleted-list"].includes(type)) {
        const {document, blocks} = value;

        if (blocks.size > 0) {
            const parent = document.getParent(blocks.first().key);
            isActive = hasBlock("list-item", value) && parent && parent.type === type;
        }
    }

    return (
        <Button
            type={isActive ? "primary" : "default"}
            onMouseDown={event => onClickBlock(event, type, {value, editor})}
        >
            {icon}
        </Button>
    );
};

export const renderInsertableBlockButton = (type, icon, {value, editor, showModal}) => {
    return (
        <Button type="primary" ghost={true}
                onMouseDown={event => onClickInsertable(event, type, {value, editor, showModal})}>
            {icon}
        </Button>
    );
};
