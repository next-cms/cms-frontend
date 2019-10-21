import React from "react";
import RTEContextProvider from "./RTEContextProvider";
import EditorViewModeSwitcher from "./core/EditorViewModeSwitcher";

const RichTextEditor = ({onSave, projectId, postId, post}) => {

    const _onSave = (_post) => {
        onSave({
            ...post,
            ..._post,
            type: "post",
            projectId
        });
    };

    return (
        <RTEContextProvider value={post ? post.contents : null} title={post ? post.title : null}>
            <EditorViewModeSwitcher onSave={_onSave} {...{projectId, postId, post}}/>
        </RTEContextProvider>
    );
};

export default RichTextEditor;
