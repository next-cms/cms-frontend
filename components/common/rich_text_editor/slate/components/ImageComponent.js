import React, { Fragment, useState } from "react";
import { Button, Icon, InputNumber, Popconfirm, Popover, Row } from "antd";

const ImageComponent = ({ src, editor, attributes, isFocused, isSelected }) => {

    const [heightFieldValue, setHeightFieldValue] = useState(0);
    const [widthFieldValue, setWidthFieldValue] = useState(0);

    const [height, setHeight] = useState("auto");
    const [width, setWidth] = useState("100%");

    const changeImageSize = () => {
        setHeight(heightFieldValue === 0 ? "auto" : `${heightFieldValue}px`);
        setWidth(widthFieldValue === 0 ? "100%" : `${widthFieldValue}px`);
    };

    const resetImageSize = () => {
        setHeight("auto");
        setWidth("100%");
        setHeightFieldValue(0);
        setWidthFieldValue(0);
    };

    const confirm = () => {
        editor.unwrapBlock("align");
        editor.delete();
    };

    const rightAlign = () => {
        editor.insertBlockAlign("right", "image");
    };

    const leftAlign = () => {
        editor.insertBlockAlign("left", "image");
    };

    const centerAlign = () => {
        editor.unwrapBlock("align");
    };

    return (
        <Popover
            content={
                <Fragment>
                    <Button style={{ marginRight: "5px" }} onClick={leftAlign}>
                        <Icon type="align-left" />
                    </Button>
                    <Button style={{ marginRight: "5px" }} onClick={centerAlign}>
                        <Icon type="align-center" />
                    </Button>
                    <Button style={{ marginRight: "5px" }} onClick={rightAlign}>
                        <Icon type="align-right" />
                    </Button>
                    <InputNumber style={{ marginRight: "5px" }} value={heightFieldValue} min={0} placeholder="height" onChange={value => setHeightFieldValue(value)} />
                    <InputNumber style={{ marginRight: "5px" }} value={widthFieldValue} min={0} placeholder="width" onChange={value => setWidthFieldValue(value)} />
                    <Button style={{ marginRight: "5px" }} onClick={changeImageSize}>
                        <Icon type="check" />
                    </Button>
                    <Button style={{ marginRight: "5px" }} onClick={resetImageSize}>
                        <Icon type="undo" />
                    </Button>
                    <Popconfirm
                        placement="rightTop"
                        title="are your sure."
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button><Icon type="delete" /></Button>
                    </Popconfirm>
                </Fragment>
            }
            trigger="click"
            visible={isSelected}
        >
            <div style={{ textAlign: "center" }}>
                <img className="image" {...attributes} src={src} alt="no photo" />
                <style jsx>
                    {`
                        img.image {
                            width: ${width};
                            height: ${height};
                            outline: ${isSelected ? "3px solid red" : ""};
                        }
                    `}
                </style>
            </div>
        </Popover>
    );
};

export default ImageComponent;
