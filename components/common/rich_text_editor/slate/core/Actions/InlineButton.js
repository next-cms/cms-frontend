import {Button, message} from "antd";
import React from "react";
import isUrl from "is-url";


/* Inline  */

const hasLink = (type, value) => {
    return value.inlines.some(inline => inline.type === type)
}

const onClickLink = (event, type, { value, editor }) => {

    event.preventDefault()

    const hasLinks = hasLink(type, value);

    if (hasLinks) {

        editor.unwrapInline('link');

    } else if (value.selection.isExpanded) {

        const href = window.prompt('Enter the URL of the link:')

        if (href === null || !isUrl(href)) {
            message.error('Please enter a valid link.');
            return;
        }

        editor.wrapLink(href);

    } else {

        const href = window.prompt('Enter the URL of the link:')

        if (href === null || !isUrl(href)) {
            message.error('Please enter a valid link.');
            return;
        }

        const text = window.prompt('Enter the text for the link:')

        if (text === null || text === "") {
            message.error('Please enter a valid link text.');
            return;
        }

        editor
            .insertText(text)
            .moveFocusBackward(text.length)
            .wrapLink(href);
    }

}

export const renderLinkButton = (type, icon, { value, editor }) => {

    const isActive = hasLink(type, value);

    return (
        <Button
            style={{fontSize: "24px", boxShadow: "0px 0px 10px #888888"}}
            shape="circle"
            type={isActive ? "primary" : "default"}
            onMouseDown={event => onClickLink(event, type, { value, editor })}
        >
            {icon}
        </Button>
    );
};

/*  Inlne End */
