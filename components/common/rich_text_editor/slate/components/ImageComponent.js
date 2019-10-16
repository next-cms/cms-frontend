import React, { useState, Fragment, useEffect } from 'react';
import { Popover, Button, Icon, Row, Col, InputNumber, Input, Popconfirm } from 'antd';

const InputGroup = Input.Group;


const ImageComponent = ({ src, editor, attributes, isFocused, isSelected }) => {

    const [heightFieldValue, setHeightFieldValue] = useState(0);
    const [widthFieldValue, setWidthFieldValue] = useState(0);

    const [height, setHeight] = useState("auto");
    const [width, setWidth] = useState("100%");

    const [toolTip2, setToolTip2] = useState(false);

    const openSecondToolTip = () => {
        setToolTip2(true);
    }

    const changeImageSize = () => {
        setHeight(heightFieldValue === 0 ? 'auto' : `${heightFieldValue}px`);
        setWidth(widthFieldValue === 0 ? '100%' : `${widthFieldValue}px`);
        setToolTip2(false);
    }

    const confirm = () => {
        editor.delete();
    }
    
    const rightAlign = () => {
        console.log("clicked right align.")
        // editor.wrapBlock('col').splitInline(editor.insertBlock("paragraph").wrapBlock('col')).wrapBlock('row');
        editor.wrapBlock('col').wrapBlock('row');
    }

    return (
        <Fragment>

            <Popover
                content={
                    <Fragment>
                        <Row gutter={0} style={{ marginBottom: '5px' }}>
                            <Col span={12}>
                                <InputNumber min={1} placeholder="height" onChange={value => setHeightFieldValue(value)} />
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
                            <Button style={{ marginRight: '5px' }} onClick={rightAlign}>
                                <Icon type="align-right" />
                            </Button>
                            <Button style={{ marginRight: '5px' }} onClick={openSecondToolTip}>
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
                    <img className="image" {...attributes} src={src} alt="no photo" />
                </Popover>
            </Popover>

            <style jsx global>
                {`
                    img.image {
                        width: ${width};
                        height: ${height};
                        outline: ${isSelected ? '3px solid red' : ''};
                    }
                `}
            </style>
        </Fragment>
    );
}

export default ImageComponent;