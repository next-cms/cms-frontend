import React, { useState, Fragment, useRef } from "react"

import { Editor } from 'slate-react';
import { Value } from 'slate';

import initialValue from './value.json';
import StandardToolBar from "./tools/StandardToolBar.js";
import renderMark from "./renederers/MarkRenderer.js";
import renderBlock from "./renederers/BlockRenderer.js";
import HotKey from "./plugins/HotKey.js";

const PlugableSlateTextEditor = () => {

    const editor = useRef(null);
    const [state, setState] = useState(Value.fromJSON(initialValue));

    const onChange = ({ value }) => {
        setState(value);
    }

    const plugins = [
        HotKey({ key: 'b', type: 'bold' }),
        HotKey({ key: '`', type: 'code' }),
        HotKey({ key: 'i', type: 'italic' }),
        HotKey({ key: '~', type: 'strikethrough' }),
        HotKey({ key: 'u', type: 'underline' }),
    ]

    return (
        <Fragment>
            <StandardToolBar 
                state={state}
                editor={editor.current}
            />
            <Editor
                ref={editor}
                plugins={plugins}
                value={state}
                onChange={onChange}
                // onKeyDown={onKeyDown}
                renderMark={renderMark}
                renderBlock={renderBlock}
            />
        </Fragment>
    )
}

export default PlugableSlateTextEditor;