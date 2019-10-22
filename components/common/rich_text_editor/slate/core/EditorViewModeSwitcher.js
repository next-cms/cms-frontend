import React, {Fragment, useContext} from "react";
import {RTEContext} from "../RTEContextProvider";
import EditorCore from "./EditorCore";
import ViewCore from "./ViewCore";
import StandardToolBar from "../tools/StandardToolBar";
import {Affix, Button} from "antd";
import {Toolbar} from "../SlateComponet";

const EditorViewModeSwitcher = ({onSave, projectId, postId, post}) => {
    const rteContext = useContext(RTEContext);

    if (rteContext.previewMode) {
        return (
            <Fragment>
                <div>
                    <Affix offsetTop={80}>
                        <Toolbar style={{
                            padding: "0 20px 10px 20px",
                            display: "flex",
                            flexDirection: "column",
                            borderBottom: "none"
                        }}>
                            <Button type="primary" shape="round" onClick={() => rteContext.setPreviewMode(false)}
                                    style={{
                                        top: "0",
                                        boxShadow: "0px 0px 10px #888888",
                                        float: "right",
                                        alignSelf: "flex-end"
                                    }}>
                                Close Preview
                            </Button>
                        </Toolbar>
                    </Affix>
                </div>
                <ViewCore/>
            </Fragment>
        );
    }
    return (
        <Fragment>
            <StandardToolBar
                onSave={onSave}
                postId={postId}
                post={post}
                projectId={projectId}
            />
            <EditorCore/>
        </Fragment>
    );
};

export default EditorViewModeSwitcher;
