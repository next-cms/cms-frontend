import React from 'react';
import RTEContextProvider from './RTEContextProvider';
import ViewCore from './core/ViewCore';

const RichTextViewer = () => {

    return (
        <RTEContextProvider>
            <ViewCore />
        </RTEContextProvider>
    );
};

export default RichTextViewer;
