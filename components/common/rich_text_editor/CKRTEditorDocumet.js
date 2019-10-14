import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const CKRTEditorDocumet = ({title, defaultValue}) => {

    const [value, setValue] = useState(defaultValue);

        return (
            <div className="App">
                <h2>{title}</h2>
                <CKEditor
                    onInit={ editor => {
                        console.log( 'Editor is ready to use!', editor );

                        // editor.plugins.get("FileRepository").createUploadAdapter = function(loader) {
                        //     return new UploadAdapter(loader);
                        //  };

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                    } }
                    onChange={(event, editor) => {

                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        setValue(data);
                        console.log(value);
                    }}
                    editor={ DecoupledEditor }
                    data={value}
                    // config={ 
                       
                    //  }
                />
            </div>
        );
}

export default CKRTEditorDocumet;