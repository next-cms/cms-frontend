import React from "react";
import { Layout } from "antd";

const Header = ({ brand, menu }) => {
    return (
        <Layout.Header>
            <div className="logo">{brand}</div>
            {menu}
        </Layout.Header>
    );
};
export default Header;
