import React from "react";

import StandardToolBar from "./tools/StandardToolBar.js";
import RTEContextProvider from "./RTEContextProvider";
import EditorCore from "./core/EditorCore";

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
            <StandardToolBar
                onSave={_onSave}
                postId={postId}
                post={post}
                projectId={projectId}
            />
            {/*<TableToolBar/>*/}
            <EditorCore />
        </RTEContextProvider>
    );
};

export default RichTextEditor;
