import React from "react";
import * as PropTypes from "prop-types";
import {Layout} from "antd";

const {Content, Sider} = Layout;

const PageWrapper = ({pageHeader, children, style}) => {
    return (
        <Content className="app_page">
            <div className="page_header">
                {pageHeader}
            </div>
            <div className="page_content" style={style}>
                {children}
            </div>
        </Content>
    );
};

PageWrapper.propTypes = {
    pageHeader: PropTypes.element,
    children: PropTypes.node.isRequired,
    style: PropTypes.object
};

export default PageWrapper;
