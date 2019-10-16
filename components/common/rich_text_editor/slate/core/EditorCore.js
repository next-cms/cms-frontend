import React, {Fragment, useContext, useEffect, useRef} from "react";

import {Editor} from "slate-react";
import HotKey from "../plugins/HotKey";
import {RTEContext} from "../RTEContextProvider";
import onDropOrPaste from "../plugins/OnDropOrPaste";
import renderMark from "../renederers/MarkRenderer";
import renderBlock from "../renederers/BlockRenderer";
import schema from "./Schema";
import MediaGallery from "../../../media_gallery/MediaGallery";
import EditorModal from "./EditorModal";

const plugins = [
    HotKey({key: "b", type: "bold"}),
    HotKey({key: "`", type: "code"}),
    HotKey({key: "i", type: "italic"}),
    HotKey({key: "~", type: "strikethrough"}),
    HotKey({key: "u", type: "underline"}),
];

const TextEditor = () => {
    const editor = useRef(null);
    const rteContext = useContext(RTEContext);

    const onChange = ({value}) => {
        rteContext.setEditorValue(value);
    };

    const onSelectImageInMediaGallery = (photo) => {
        rteContext.setGallerySelectedItem(photo);
    };

    useEffect(() => {
        rteContext.setEditorInstance(editor.current);
    }, []);

    return (
        <Fragment>
            <Editor
                ref={editor}
                plugins={plugins}
                value={rteContext.value}
                onChange={onChange}
                onDrop={onDropOrPaste}
                onPaste={onDropOrPaste}
                renderMark={renderMark}
                renderBlock={renderBlock}
                schema={schema}
            />
            <EditorModal title="Gallery">
                <MediaGallery isSingleSelect={true} onSelect={onSelectImageInMediaGallery}/>
            </EditorModal>
        </Fragment>
    );
};

export default TextEditor;
