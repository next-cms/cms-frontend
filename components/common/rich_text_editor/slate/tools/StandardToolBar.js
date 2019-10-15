import React from 'react';
import { Toolbar } from '../SlateComponet';
import { renderMarkButton, renderBlockButton } from './Core';

const StandardToolBar = ({ state, editor }) => {
    return (
        <Toolbar>
            {renderMarkButton('bold', 'bold', state, editor)}
            {renderMarkButton('italic', 'italic', state, editor)}
            {renderMarkButton('underline', 'underline', state, editor)}
            {renderMarkButton('code', 'code', state, editor)}
            {renderMarkButton('strikethrough', 'strikethrough', state, editor)}
            {renderBlockButton('heading-one', 'looks_one', state, editor)}
            {renderBlockButton('heading-two', 'looks_two', state, editor)}
            {renderBlockButton('block-quote', 'format_quote', state, editor)}
            {renderBlockButton('numbered-list', 'ordered-list', state, editor)}
            {renderBlockButton('bulleted-list', 'unordered-list', state, editor)}
        </Toolbar>
    );
}

export default StandardToolBar;