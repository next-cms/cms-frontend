import React from "react";
import { Typography } from 'antd';

const { Text } = Typography;

const renderMark = (props, editor, next) => {

    switch (props.mark.type) {
        case "bold":
            return <strong>{props.children}</strong>;
        case "code":
            return <Text code>{props.children}</Text>;
        case "mark":
            return <Text mark>{props.children}</Text>;
        case "italic":
            return <em>{props.children}</em>;
        case "strikethrough":
            return <del>{props.children}</del>;
        case "underline":
            return <u>{props.children}</u>;
        default:
            return next();
    }
};

export default renderMark;
