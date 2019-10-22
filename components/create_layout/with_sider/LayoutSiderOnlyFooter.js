import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const LayoutWithSider = ({ siderMenu, children, footer }) => {
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
            {footer}
        </Layout>
    );
};
export default LayoutWithSider;
