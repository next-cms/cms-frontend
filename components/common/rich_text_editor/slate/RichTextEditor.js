import React from "react";

import StandardToolBar from "./tools/StandardToolBar.js";
import RTEContextProvider from "./RTEContextProvider";
import EditorCore from "./core/EditorCore";

const RichTextEditor = ({onSave, projectId, postId, post={}}) => {

    const _onSave = (_post) => {
        onSave({
            ..._post,
            slug: _post.slug ? _post.slug : post.slug,
            type: "post",
            projectId
        });
    };

    return (
        <RTEContextProvider value={post.contents} title={post.title}>
            <StandardToolBar
                onSave={_onSave}
                postId={postId}
                projectId={projectId}
            />
            {/*<TableToolBar/>*/}
            <EditorCore />
        </RTEContextProvider>
    );
};

export default RichTextEditor;
