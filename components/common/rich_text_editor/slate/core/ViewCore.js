import React, { useContext, Fragment } from 'react';
import { Editor } from 'slate-react';
import { RTEContext } from '../RTEContextProvider';
import renderMark from '../renederers/MarkRenderer';
import renderBlock from '../renederers/BlockRenderer';
import renderInline from '../renederers/InlineRenderer';
import schema from './Schema';
import { Divider } from 'antd';


const ViewCore = () => {

    const rteContext = useContext(RTEContext);

    return (
        <Fragment>
            <Divider />
            <h2>View</h2>
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
