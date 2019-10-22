import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const LayoutWithSider = ({ header, siderMenu, children }) => {
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
        </Layout>
    );
};
export default LayoutWithSider;
