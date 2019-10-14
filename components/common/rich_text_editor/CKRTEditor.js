import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKRTEditor = ({title, defaultValue}) => {

    const [value, setValue] = useState(defaultValue);

    return (
        <div className="CK-Editor">
            <h2>{title}</h2>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    // console.log({ event, editor, data });
                    setValue(data);
                    console.log(value);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
}

export default CKRTEditor;