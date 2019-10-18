import React from 'react';
import PageWrapper from '../../components/common/PageWrapper';
import RichTextEditor from '../../components/common/rich_text_editor/slate/RichTextEditor';
import RichTextViewer from '../../components/common/rich_text_editor/slate/RichTextViewer';

const Post = () => {

    const onSave = (value) => {
        console.log(value);
    }

    return ( 
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            flexDirection: "column",
            minHeight: "calc(100vh - 80px)",
            padding: "20px"
        }}>
            <RichTextEditor onSave={onSave} />
        </PageWrapper>
     );
}
 
export default Post;