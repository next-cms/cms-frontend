import Plain from "slate-plain-serializer";
import { Editor, getEventTransfer } from "slate-react";
import { Value } from "slate";
import renderMark from "../tables-slate/renderers/MarkRendererTable";
import renderBlock from "../tables-slate/renderers/BlockRendererTable";
import React from "react";
import initialValueAsJson from "./value.json";
import { onDropOrPaste, onKeyDown } from "./TableFunctionality";

const Table = () => {
    const initialValue = Value.fromJSON(initialValueAsJson);
    return (
        <div>
            <Editor
                placeholder="Enter some text..."
                defaultValue={initialValue}
                onKeyDown={onKeyDown}
                onDrop={onDropOrPaste}
                onPaste={onDropOrPaste}
                renderBlock={renderBlock}
                renderMark={renderMark}
            />
        </div>
    );
};
export default Table;