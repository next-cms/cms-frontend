import React, { useState } from "react";
import { Button, Card, Divider, Empty, PageHeader, Select } from "antd";
import { startCase } from "lodash";
import LayoutTemplateSelectionModal from "./LayoutTemplateSelectionModal";

const { Option } = Select;

const LayoutEditorComponent = ({ projectId }) => {

    const [visible, setVisible] = useState(false);
    const [ selectedLayout, setSelectedLayout ] = useState();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = (layout) => {
        setVisible(false);
        setSelectedLayout(layout);
        // TODO API call/Mutation
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <React.Fragment>
            <PageHeader
                title="Layout"
                subTitle="Choose a new layout"
                extra={

                    <Button type="primary" onClick={showModal}>Create New Layout</Button>
                }
            />
            {!selectedLayout ? (
                <Empty
                    image="/images/empty.png"
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
                        <img width="100%" height="100%" src={`/images/layout/${selectedLayout.name}.png`} alt={""}/>
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
            <LayoutTemplateSelectionModal visible={visible} handleOk={handleOk} handleCancel={handleCancel}
                                          currentLayout={selectedLayout}/>
        </React.Fragment>
    );
};
export default LayoutEditorComponent;
