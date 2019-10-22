import React from "react";
import { Layout } from "antd";

// eslint-disable-next-line react/prop-types
const Footer = ({ children }) => {
    return (
        <Layout.Header>
            {children}
        </Layout.Header>
    );
};
export default Footer;
