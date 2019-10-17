import React from 'react';

const BlockAlign = ({align, attributes, children}) => {

    console.log("ok align");

    return ( 
        <div {...attributes} className="align-block">
            {children}
            <style jsx global>
                {`
                    .align-block {
                        display: inline-block;
                        width: 50%;
                        height: auto;
                        float: ${align};
                        margin: ${align === "left" ? "0 20px 0 0" : "0 0 0 20px"}
                    }
                `}
            </style>
        </div>
     );
};

BlockAlign.defaultProps = {
    align: "left"
};
 
export default BlockAlign;