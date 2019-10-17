import {Button} from "antd";
import React from "react";
import {getEventTransfer} from "slate-react";
import isUrl from "is-url";
import imageExtensions from "image-extensions";
import Plain from "slate-plain-serializer";

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

const opts = {
    typeTable: "table",
    typeRow: "table_row",
    typeCell: "table_cell",
    typeContent: "paragraph"
};

const onClickInsertable = (event, type, {value, editor, showModal}) => {
    event.preventDefault();

    if (type === "image") {
        showModal().then((photo) => {
            console.log("selected image:", photo);
            const src = photo.src;
            if (!src) return;
            editor.insertImage(src);
        }).catch(e => console.log(e.message));
    } else if (type === "table") {
        editor.insertTable(opts, 2, 2);
    }
};

const onClickAlignment = (event, alignType, {value, editor}) => {

    const isImage = hasBlock("image", value);

    let type = null;

    if(isImage) {
        if(alignType === "center") {
            editor.unwrapBlock("align");
            return;
        }
        type = "image";
    }



    event.preventDefault();

    editor.insertBlockAlign(alignType, type);
};

const onClickBlock = (event, type, {value, editor}) => {
    event.preventDefault();

    const {document} = value;
    const isActive = hasBlock(type, value);

    if (type !== "bulleted-list" && type !== "numbered-list") {
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

export const renderAlignmentButton = (alignType, icon, {value, editor}) => {
    return (
        <Button type="primary" ghost={true}
                onMouseDown={event => onClickAlignment(event, alignType, {value, editor})}>
            {icon}
        </Button>
    );
};

export const onDropOrPaste = (event, editor, next) => {

    const target = editor.findEventRange(event);

    if (!target && event.type === "drop") return next();

    const transfer = getEventTransfer(event);
    const {type, text, files} = transfer;

    if (type === "files") {
        event.preventDefault();
        for (const file of files) {
            const reader = new FileReader();
            const [mime] = file.type.split("/");
            if (mime !== "image") continue;

            reader.addEventListener("load", () => {
                editor.insertImage(reader.result, target);
            });

            reader.readAsDataURL(file);
        }
        return;
    }

    if (type === "text") {
        event.preventDefault();
        if (!isUrl(text)) return next();
        if (!isImage(text)) return next();
        editor.insertImage(text, target);
        return;
    }

    if (value.startBlock.type === "table-cell") {
        if (text) {
            const lines = text.split("\n");
            const {document} = Plain.deserialize(lines[0] || "");
            editor.insertFragment(document);
            return;
        }
        return false;
    }

    next();
};

/**
 * On return, do nothing if inside a table cell.
 *
 * @param {Event} event
 * @param editor
 * @param next
 */

const onEnter = (event, editor, next) => {
    event.preventDefault();
    return next();
};

/**
 * On key down, check for our specific key shortcuts.
 *
 * @param {Event} event
 * @param {Change} editor
 * @param {next} next
 */
export const onKeyDown = (event, editor, next) => {
    const {value} = editor;
    const {document, selection} = value;
    const {start, isCollapsed} = selection;
    const startNode = document.getDescendant(start.key);

    if (isCollapsed && start.isAtStartOfNode(startNode)) {
        const previous = document.getPreviousText(startNode.key);
        const prevBlock = document.getClosestBlock(previous.key);

        if (prevBlock.type === "table-cell") {
            if (["Backspace", "Delete", "Enter"].includes(event.key)) {
                event.preventDefault();
                return true;
            } else {
                return;
            }
        }
    }

    if (value.startBlock.type !== "table-cell") {
        return;
    }

    switch (event.key) {
        case "Backspace":
            return onBackspace(event, editor, next);
        case "Delete":
            return onDelete(event, editor, next);
        case "Enter":
            return onEnter(event, editor, next);
    }
};

/**
 * On backspace, do nothing if at the start of a table cell.
 *
 * @param {Event} event
 * @param {Change} editor
 * @param next
 */

const onBackspace = (event, editor, next) => {
    const {value} = editor;
    const {selection} = value;
    if (selection.start.offset !== 0) return;
    event.preventDefault();
    return next();
};

/**
 * On delete, do nothing if at the end of a table cell.
 *
 * @param {Event} event
 * @param editor
 * @param next
 */

const onDelete = (event, editor, next) => {
    const {value} = change;
    const {selection} = value;
    if (selection.end.offset !== value.startText.text.length) return;
    event.preventDefault();
    return next();
};

const getExtension = (url) => {
    return new URL(url).pathname.split(".").pop();
};

const isImage = (url) => {
    return imageExtensions.includes(getExtension(url));
};
