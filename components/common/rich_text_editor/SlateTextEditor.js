import React, { useState } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        text: 'A line of text in a paragraph.',
                    },
                ],
            },
        ],
    },
})

const SlateTextEditor = () => {

    // const [value, setValue] = useState(initialValue);

    const onChange = ({ value }) => {
        // setValue(value);
        console.log(value)
    }

    return (
        <Editor value={value} onChange={onChange} />
    );
}

export default SlateTextEditor;