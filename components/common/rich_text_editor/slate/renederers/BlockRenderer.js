import React from "react";
import { Row, Col } from "antd";

const renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        case "image": {
            return <img {...attributes} src={node.data.get("src")} style={{ maxWidth: "100%" }} alt="no photo" />;
        }
        case "row": {
            return <Row {...attributes}>{children}</Row>;
        }
        case "col": {
            return (
                <Col {...attributes}>{children}</Col>
            );
        }
        default:
            return next();
    }
};

export default renderBlock;
