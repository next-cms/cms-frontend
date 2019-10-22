/* eslint-disable react/prop-types */
import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const LayoutWithSider = ({ siderMenu, children }) => {
    return (
        <Layout>
            <Layout>
                <Sider>
                    {siderMenu}
                </Sider>
            </Layout>
            <Layout>
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
};
export default LayoutWithSider;
