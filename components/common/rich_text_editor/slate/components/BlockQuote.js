import React from 'react';

const BlockQuote = ({ attributes, children }) => {
    return (
        <q {...attributes}>
            {children}
            <style jsx>
                {`
                    q {
                        display: block;
                        background: #f9f9f9;
                        border-left: 10px solid #ccc;
                        margin: 1.5em 10px;
                        padding: 0.5em 10px;
                    }
                    q:before {
                        color: #ccc;
                        content: open-quote;
                        font-size: 4em;
                        line-height: 0.1em;
                        margin-right: 0.25em;
                        vertical-align: -0.4em;
                    }
                    q:after {
                        color: #ccc;
                        content: close-quote;
                        font-size: 4em;
                        line-height: 0.1em;
                        margin-right: 0.25em;
                        vertical-align: -0.4em;
                    }
                `}
            </style>
        </q>
    );
}

export default BlockQuote;