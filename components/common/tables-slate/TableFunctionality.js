import Plain from "slate-plain-serializer";
import { getEventTransfer } from "slate-react";
export const onBackspace = (event, editor, next) => {
    const { value } = editor;
    const { selection } = value;
    if (selection.start.offset !== 0) return next();
    event.preventDefault();
};

export const onDelete = (event, editor, next) => {
    const { value } = editor;
    const { selection } = value;
    if (selection.end.offset !== value.startText.text.length) return next();
    event.preventDefault();
};

export const onDropOrPaste = (event, editor, next) => {
    const transfer = getEventTransfer(event);
    const { value } = editor;
    const { text = "" } = transfer;

    if (value.startBlock.type !== "table-cell") {
        return next();
    }

    if (!text) {
        return next();
    }

    const lines = text.split("\n");
    const { document } = Plain.deserialize(lines[0] || "");
    editor.insertFragment(document);
};

export const onEnter = (event, editor, next) => {
    event.preventDefault();
};

export const onKeyDown = (event, editor, next) => {
    const { value } = editor;
    const { document, selection } = value;
    const { start, isCollapsed } = selection;
    const startNode = document.getDescendant(start.key);

    if (isCollapsed && start.isAtStartOfNode(startNode)) {
        const previous = document.getPreviousText(startNode.key);

        if (!previous) {
            return next();
        }

        const prevBlock = document.getClosestBlock(previous.key);

        if (prevBlock.type === "table-cell") {
            if (["Backspace", "Delete", "Enter"].includes(event.key)) {
                event.preventDefault();
            } else {
                return next();
            }
        }
    }

    if (value.startBlock.type !== "table-cell") {
        return next();
    }

    switch (event.key) {
        case "Backspace":
            return this.onBackspace(event, editor, next);
        case "Delete":
            return this.onDelete(event, editor, next);
        case "Enter":
            return this.onEnter(event, editor, next);
        default:
            return next();
    }
};