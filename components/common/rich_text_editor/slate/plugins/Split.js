const Split = {

    commands: {
        split: (editor) => {
            editor.wrapBlock("row").wrapBlock("col").insertBlock("paragraph").unwrapBlock("col").wrapBlock("col");
        }
    }
    
};

export default Split;
