import React from 'react';

const BlockAlignment = ({ align, type, attributes, children }) => {

    switch (type) {
        case "image":
            return <div {...attributes} className="align-image">
                {children}
                <style jsx>
                    {`
                            .align-image {
                                display: inline-block;
                                width: 50%;
                                height: auto;
                                float: ${align};
                                margin: ${align === "left" ? "0 20px 0 0" : "0 0 0 20px"}
                            }
                        `}
                </style>
            </div>
        default:
            return <div style={{ textAlign: align }} {...attributes}>{children}</div>
    }
};

BlockAlignment.defaultProps = {
    align: "left",
    type: null
};

export default BlockAlignment;