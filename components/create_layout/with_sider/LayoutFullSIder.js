/* eslint-disable react/prop-types */
import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const LayoutWithSider = ({ header, siderMenu, children, footer }) => {
    return (
        <Layout>
            {header}
            <Sider style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0
            }}>
                {siderMenu}
            </Sider>
            <Layout>
                {header}
                <Content>{children}</Content>
            </Layout>
            {footer}
        </Layout>
    );
};
export default LayoutWithSider;
