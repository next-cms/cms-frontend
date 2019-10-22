import React from "react";
import { Layout } from "antd";

// eslint-disable-next-line react/prop-types
const Footer = ({ children }) => {
    return (
        <Layout.Footer>
            {children}
        </Layout.Footer>
    );
};
export default Footer;
