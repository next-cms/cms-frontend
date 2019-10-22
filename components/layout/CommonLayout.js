import React, {useState} from "react";
import {Layout} from "antd";
import "./layout.scss";
import AsideLeft from "./aside/AsideLeft";
import * as PropTypes from "prop-types";

const {Content, Sider} = Layout;

const CommonLayout = ({children, footer}) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    return (
        <Layout>
            <Sider className="left_sider" collapsible collapsed={collapsed} onCollapse={onCollapse} style={{
                overflow: "hidden",
                height: "calc(100vh - 48px)",
                position: "fixed",
                left: 0,
            }}>
                <AsideLeft collapsed={collapsed} style={{
                    overflow: "auto",
                    height: "calc(100vh - 112px)",
                }}/>
            </Sider>
            <Layout style={{marginLeft: collapsed ? "80px" : "200px", transition: "all 0.1s ease-in"}}>
                {children}
                {footer}
            </Layout>
        </Layout>
    );
};

CommonLayout.propTypes = {
    children: PropTypes.element.isRequired,
    footer: PropTypes.element,
};

export default CommonLayout;
