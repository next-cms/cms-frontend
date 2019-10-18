import React from "react";
import {Button, Layout, Modal} from "antd";
import Link from "next/link";
import "./nav_header.scss";
import RoutesInfo from "../../../constants/RoutesInfo";

const {Header} = Layout;

const EditorNavHeader = () => {

    function confirm() {
        Modal.confirm({
            title: "Are you sure?",
            content: "You are about to publish your website. This will take a while to build and deploy. Do you want to proceed?",
            okText: "Proceed",
            cancelText: "Fall Back",
            onOk() {

            }
        });
    }

    return (
        <Header className="nav_header editor_nav_header">
            <div className="left">
                {!process.env.SINGLE_PROJECT_MODE &&
                <Link href={RoutesInfo.Dashboard.path}><Button type="danger">Close Project</Button></Link>}
            </div>
            <div className="right">
                <Button type="primary" onClick={confirm}>Publish</Button>
                <Button style={{marginLeft: "5px"}} ghost>Preview</Button>
            </div>
        </Header>
    );
};

export default EditorNavHeader;
