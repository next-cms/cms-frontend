import "brace";
import "brace/mode/javascript";
import "brace/mode/jsx";
import "brace/mode/json";
import "brace/theme/github";
import AceEditor from "react-ace";
import React from "react";

const CodeEditor = (props) => (
    <AceEditor
        mode={props.mode}
        theme="github"
        onChange={props.onChange}
        name="sourceCodeEditor"
        editorProps={{
            $blockScrolling: true
        }}
        value={props.value}
        height={props.height}
        width={props.width}
    />
);

export default CodeEditor;
