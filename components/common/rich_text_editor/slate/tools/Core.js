import { Button } from "antd";

const DEFAULT_NODE = "paragraph";

export const hasMark = (type, state) => {
    return state.activeMarks.some(mark => mark.type === type);
};

export const hasBlock = (type, state) => {
    return state.blocks.some(node => node.type === type);
};


export const onClickMark = (event, type, editor) => {
    event.preventDefault();
    editor.toggleMark(type);
};

const onClickBlock = (event, type, state, editor) => {
    event.preventDefault();

    const { value } = editor;
    const { document } = value;

    if (type !== "bulleted-list" && type !== "numbered-list") {
        const isActive = hasBlock(type, state);
        const isList = hasBlock("list-item", state);

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
        const isList = hasBlock("list-item", state);
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


export const renderMarkButton = (type, icon, state, editor) => {
    const isActive = hasMark(type, state);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <Button
            type={isActive ? "primary" : "default"}
            onMouseDown={event => onClickMark(event, type, editor)}
        >
            {icon}
        </Button>
    );
};

export const renderBlockButton = (type, icon, state, editor) => {
    let isActive = hasBlock(type, state);

    if (["numbered-list", "bulleted-list"].includes(type)) {
        const { document, blocks } = state;

        if (blocks.size > 0) {
            const parent = document.getParent(blocks.first().key);
            isActive = hasBlock("list-item", state) && parent && parent.type === type;
        }
    }

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <Button
            type={isActive ? "primary" : "default"}
            onMouseDown={event => onClickBlock(event, type, state, editor)}
        >
            {icon}
        </Button>
    );
};