const BlockAlign = {
    commands: {
        insertBlockAlign: (editor, alignType, type) => {
            editor.unwrapBlock("align").wrapBlock({
                type: "align",
                data: {alignType, type}
            });
        }
    }
};

export default BlockAlign;
