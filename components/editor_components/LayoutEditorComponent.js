import React, { useState } from "react";
import { Button, Divider, Select, Empty, PageHeader, Card } from "antd";
import { startCase } from "lodash";
import ModalComponent from "../common/ModalComponent";
import PageEditorComponent from "./PageEditorComponent";

const { Option } = Select;

const LayoutEditorComponent = ({ pageName, projectId }) => {

    const [visible, setVisible] = useState(false);
    const [selectedLayout, setselectedLayout] = useState({});

    const showModal = () => {
        setVisible(true);
    };

    const _handleOk = () => {
        setVisible(false);
    };

    const _handleCancel = () => {
        setVisible(false);
    };

    const getLayout = (value) => {
        setselectedLayout(value);
    };

    return (
        <div>
            <PageHeader
                title="Layout"
                subTitle="Choose a new layout"
                extra={

                    <Button type="primary" onClick={showModal}>Create New Layout</Button>
                }
            />
            {selectedLayout.name === undefined ? (
                <Empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    imageStyle={{
                        height: 60,
                    }}
                    description={
                        <span>
                            You have no layout
                        </span>
                    }
                />) : (<div>
                    <Card title={startCase(selectedLayout.name)} >
                        <img width="100%" height="100%" src={`/static/layout/${selectedLayout.name}.png`} />
                    </Card>
                    {selectedLayout.header ? (<div style={{ marginTop: "20px" }}>
                        <h3>Select header</h3>
                        <div style={{ display: "flex" }}>
                            <Select defaultValue="Select a header" style={{ width: 250, marginRight: "10px" }}>
                                <Option value="header1">Header 1</Option>
                                <Option value="header2">Header 2</Option>
                            </Select>
                            <Divider style={{ width: "8%", minWidth: "0%", margin: "5px 10px" }}>OR</Divider>
                            <Button>Create Custom Header</Button>
                        </div>
                    </div>) : ""}
                    {selectedLayout.footer ? (<div style={{ marginTop: "20px" }}>
                        <h3>Select footer</h3>
                        <div style={{ display: "flex" }}>
                            <Select defaultValue="Select a footer" style={{ width: 250, marginRight: "10px" }}>
                                <Option value="footer1">Footer 1</Option>
                                <Option value="footer2">Footer 2</Option>
                            </Select>
                            <Divider style={{ width: "8%", minWidth: "0%", margin: "5px 10px" }}>OR</Divider>
                            <Button>Create Custom Footer</Button>
                        </div>
                    </div>) : ""}
                    {selectedLayout.sider ? (<div style={{ marginTop: "20px" }}>
                        <h3>Select sider</h3>
                        <div style={{ display: "flex" }}>
                            <Select defaultValue="Select a sider" style={{ width: 250, marginRight: "10px" }}>
                                <Option value="footer1">Sider 1</Option>
                                <Option value="footer2">Sider 2</Option>
                            </Select>
                            <Divider style={{ width: "8%", minWidth: "0%", margin: "5px 10px" }}>OR</Divider>
                            <Button>Create Custom Sider</Button>
                        </div>
                    </div>) : ""}
                    <div><Button type="primary" style={{ margin: "10px 0px" }}>Save</Button></div>
                </div>)
            }

            <ModalComponent title="Available Layouts" okText="Ok" visible={visible} handleOk={_handleOk} handleCancel={_handleCancel}>
                <PageEditorComponent layout={getLayout} />
            </ModalComponent>
        </div>
    );
};
export default LayoutEditorComponent;
