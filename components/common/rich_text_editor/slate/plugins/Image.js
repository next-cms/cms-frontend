const insertImage = (editor, src, target) => {
    // if (target) {
    //     editor.select(target)
    // }

    editor.insertBlock({
        type: "image",
        data: {src},
    });
};

export default insertImage;
