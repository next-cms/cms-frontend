import React, { useState, useEffect } from "react";
import { Select, Button, message, Radio, Divider } from "antd";
import { useQuery } from "graphql-hooks";
import { ALL_LAYOUT_TEMPLATES } from "../utils/GraphQLConstants";

const { Option } = Select;

const PageCreator = () => {

    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [isHeader, setisHeader] = useState(true);
    const [isFooter, setisFooter] = useState(true);
    const [isSider, setIsSider] = useState(false);
    const [currentLayout, setCurrentLayout] = useState("layout1");

    const { loading, error, data, refetch } = useQuery(ALL_LAYOUT_TEMPLATES, {
        variables: { skip, limit: pageSize },
        skipCache: true
    });

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading && !data) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading all available layout...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return null;
    const { allLayoutTemplates, _allLayoutTemplatesMeta } = data;

    const handleChange = (e) => {
        console.log(`selected ${e.target.value}`);
        setCurrentLayout(e.target.value);
        allLayoutTemplates.map(item => {
            if (e.target.value === item.name) {
                setisHeader(item.header);
                setisFooter(item.footer);
                setIsSider(item.sider);
            }
        });



    };

    return (
        <div>
            <div>
                <h3>Layout</h3>
                <Radio.Group onChange={handleChange} value={currentLayout}>
                    {allLayoutTemplates.map(item => (
                        <Radio key={item.name} value={item.name}>
                            {item.name}
                            <div style={{ width: "250px", height: "150px", marginLeft: "25px", marginTop: "20px" }}><img width="100%" height="100%" src="../static/layout/layout1.png" /></div>
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
            {isHeader ? (<div style={{ marginTop: "20px" }}>
                <h3>Select header</h3>
                <div style={{ display: "flex" }}>
                    <Select defaultValue="Select a header" style={{ width: 250, marginRight: "10px" }} >
                        <Option value="header1">Header 1</Option>
                        <Option value="header2">Header 2</Option>
                    </Select>
                    <Divider style={{ width: "8%", minWidth: "0%", margin: "5px 10px" }}>OR</Divider>
                    <Button>Create Custom Header</Button>
                </div>
            </div>) : ""}
            {isFooter ? (<div style={{ marginTop: "20px" }}>
                <h3>Select footer</h3>
                <div style={{ display: "flex" }}>
                    <Select defaultValue="Select a footer" style={{ width: 250, marginRight: "10px" }} >
                        <Option value="footer1">Footer 1</Option>
                        <Option value="footer2">Footer 2</Option>
                    </Select>
                    <Divider style={{ width: "8%", minWidth: "0%", margin: "5px 10px" }}>OR</Divider>
                    <Button>Create Custom Footer</Button>
                </div>
            </div>) : ""}
            {isSider ? (<div style={{ marginTop: "20px" }}>
                <h3>Select sider</h3>
                <div style={{ display: "flex" }}>
                    <Select defaultValue="Select a sider" style={{ width: 250, marginRight: "10px" }} >
                        <Option value="footer1">Sider 1</Option>
                        <Option value="footer2">Sider 2</Option>
                    </Select>
                    <Divider style={{ width: "8%", minWidth: "0%", margin: "5px 10px" }}>OR</Divider>
                    <Button>Create Custom Sider</Button>
                </div>
            </div>) : ""}
            <div><Button type="primary" style={{ margin: "10px 0px" }}>Save</Button></div>
        </div>
    );
};
export default PageCreator;
