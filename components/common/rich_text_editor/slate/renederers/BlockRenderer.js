import React from "react";
import ImageComponent from "../components/ImageComponent";
import { Col, Row } from "antd";
import { Paragraph, Table, TableCell, TableRow } from "../SlateComponet";

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
            return <ImageComponent src={node.data.get("src")} editor={editor} {...props} />;
        }
        case "col": {
            return <Col xs={12} {...attributes}>{children}</Col>;
        }
        case "row": {
            return <Row {...attributes}>{children}</Row>;
        }
        case "table":
            return <Table {...props} />;
        case "table_row":
            return <TableRow {...props} />;
        case "table_cell":
            return <TableCell {...props} />;
        case "paragraph":
            return <Paragraph {...props} />;
        default:
            return next();
    }
};

export default renderBlock;
