import React from "react";
import { Layout } from "antd";

// eslint-disable-next-line react/prop-types
const Header = ({ brand, menu }) => {
    return (
        <Layout.Header>
            <div className="logo">{brand}</div>
            {menu}
        </Layout.Header>
    );
};
export default Header;
