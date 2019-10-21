import React, { useState } from "react";
import { Select, Button } from "antd";


const { Option } = Select;

const PageCreator = () => {
    const [footerOn, setFooterOn] = useState(true);
    const [headerOn, setHeaderOn] = useState(true);
    const [layout, setLayout] = useState({
        name: "",
        header: headerOn,
        footer: footerOn,
        content: {},
        sider: false

    });

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        if (value === "layoutwithOnlyHeader" || value === "siderLayoutwithOnlyHeader") {
            setFooterOn(false);
            setHeaderOn(true);

            setLayout({
                name: value,
                header: true,
                footer: false,
                content: {},
                sider: value.includes("sider") ? true : false
            });
        }
        else if (value === "layoutwithOnlyFooter" || value === "siderLayoutwithOnlyFooter") {
            console.log("Values: ", headerOn, footerOn, sider);
            setHeaderOn(false);
            setFooterOn(true);
            setLayout({
                name: value,
                header: false,
                footer: true,
                content: {},
                sider: value.includes("sider") ? true : false
            });
        }
        else if (value === "layoutOnly" || value === "siderLayoutOnly") {
            setFooterOn(false);
            setHeaderOn(false);
            setLayout({
                name: value,
                header: false,
                footer: false,
                content: {},
                sider: value.includes("sider") ? true : false
            });
        }
        else {
            setFooterOn(true);
            setHeaderOn(true);
            setLayout({
                name: value,
                header: true,
                footer: true,
                content: {},
                sider: value.includes("sider") ? true : false
            });
        }
    };

    console.log("model: ", layout);
    const onHeaderChange = (header) => {
        if (header === "") {

        }
        else {

        }
    };
    const onFooterChange = (footer) => {
        if (footer === "footer") {

        }
        else {

        }
    };
    return (
        <div>
            <div>
                <h3>Select a layout</h3>
                <Select defaultValue="Select a layout" style={{ width: 290 }} onChange={handleChange}>
                    <Option value="layoutwithHeaderFooter">Layout With Header and Footer</Option>
                    <Option value="layoutwithOnlyHeader">Layout With Only Header</Option>
                    <Option value="layoutwithOnlyFooter">Layout With Only Footer</Option>
                    <Option value="layoutOnly">Only Layout</Option>
                    <Option value="siderLayoutwithHeaderFooter">Layout With Sider, Header and Footer</Option>
                    <Option value="siderLayoutwithOnlyHeader">Layout With Sider, Only Header</Option>
                    <Option value="siderLayoutwithOnlyFooter">Layout With Sider, Only Footer</Option>
                    <Option value="siderLayoutOnly">Only Sider Layout</Option>
                </Select>
            </div>
            {headerOn ? (<div>
                <h3>Select header</h3>
                <Select defaultValue="Select a header" style={{ width: 250 }} onChange={onHeaderChange}>
                    <Option value="header1">Header 1</Option>
                    <Option value="header2">Header 2</Option>
                </Select>
            </div>) : ""}
            {footerOn ? (<div>
                <h3>Select footer</h3>
                <Select defaultValue="Select a footer" style={{ width: 250 }} onChange={onFooterChange}>
                    <Option value="footer1">Footer 1</Option>
                    <Option value="footer2">Footer 2</Option>
                </Select>
            </div>) : ""}
            <div><Button type="primary" style={{ margin: "10px 0px" }}>Save</Button></div>
        </div>
    );
};
export default PageCreator;
