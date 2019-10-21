import React, {Fragment, useContext} from "react";
import {Editor} from "slate-react";
import {RTEContext} from "../RTEContextProvider";
import renderMark from "../renederers/MarkRenderer";
import renderBlock from "../renederers/BlockRenderer";
import renderInline from "../renederers/InlineRenderer";
import schema from "./Schema";


const ViewCore = () => {

    const rteContext = useContext(RTEContext);

    return (
        <Fragment>
            {rteContext.title && <h1 style={{textAlign: "center"}}>{rteContext.title}</h1>}
            <Editor
                value={rteContext.value}
                renderMark={renderMark}
                renderBlock={renderBlock}
                renderInline={renderInline}
                schema={schema}
                readOnly
            />
        </Fragment>
    );
};

export default ViewCore;
