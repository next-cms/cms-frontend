import React, { Fragment, useState } from "react";
import { Button, Col, Icon, Input, InputNumber, Popconfirm, Popover, Row } from "antd";

const InputGroup = Input.Group;


const ImageComponent = ({ src, editor, attributes, isFocused, isSelected }) => {

    const [heightFieldValue, setHeightFieldValue] = useState(0);
    const [widthFieldValue, setWidthFieldValue] = useState(0);

    const [height, setHeight] = useState("auto");
    const [width, setWidth] = useState("100%");

    const [toolTip2, setToolTip2] = useState(false);

    const openSecondToolTip = () => {
        setToolTip2(true);
    };

    const changeImageSize = () => {
        setHeight(heightFieldValue === 0 ? "auto" : `${heightFieldValue}px`);
        setWidth(widthFieldValue === 0 ? "100%" : `${widthFieldValue}px`);
        setToolTip2(false);
    };

    const confirm = () => {
        editor.delete();
    };

    const rightAlign = () => {
        editor.unwrapBlock("align-right").unwrapBlock("align-left");
        editor.wrapBlock("align-right");
    };

    const leftAlign = () => {
        editor.unwrapBlock("align-right").unwrapBlock("align-left");
        editor.wrapBlock("align-left");
    };

    const centerAlign = () => {
        editor.unwrapBlock("align-right").unwrapBlock("align-left");
    };

    return (
        <Fragment>

            <Popover
                content={
                    <Fragment>
                        <Row gutter={0} style={{ marginBottom: "5px" }}>
                            <Col span={12}>
                                <InputNumber min={1} placeholder="height"
                                    onChange={value => setHeightFieldValue(value)} />
                            </Col>
                            <Col span={12}>
                                <InputNumber min={1} placeholder="width" onChange={value => setWidthFieldValue(value)} />
                            </Col>
                        </Row>
                        <Button onClick={changeImageSize}>
                            <Icon type="check" />
                        </Button>
                    </Fragment>
                }
                title="Title"
                trigger="click"
                visible={toolTip2}
            >
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
                            <Button style={{ marginRight: "5px" }} onClick={openSecondToolTip}>
                                <Icon type="edit" />
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
                    </div>
                </Popover>
            </Popover>

            <style jsx global>
                {`
                    img.image {
                        width: ${width};
                        height: ${height};
                        outline: ${isSelected ? "3px solid red" : ""};
                    }
                `}
            </style>
        </Fragment>
    );
};

export default ImageComponent;
