const WrapLink = {

    commands: {
        wrapLink: (editor, href) => {

            editor.wrapInline({
                type: 'link',
                data: { href },
            })

            editor.moveToEnd();
        }
    }
    
};

export default WrapLink;
