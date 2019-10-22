/* eslint-disable react/prop-types */
import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const LayoutWithSider = ({ header, siderMenu, children, footer }) => {
    return (
        <Layout>
            {header}
            <Layout>
                <Sider>
                    {siderMenu}
                </Sider>
            </Layout>
            <Layout>
                <Content>{children}</Content>
            </Layout>
            {footer}
        </Layout>
    );
};
export default LayoutWithSider;
