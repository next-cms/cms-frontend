import React from "react";
import {Button, Layout} from "antd";
import Link from "next/link";
import "./nav_header.scss";
import RoutesInfo from "../../../constants/RoutesInfo";

const {Header} = Layout;

const EditorNavHeader = () => {

    return (
        <Header className="nav_header editor_nav_header">
            <div className="left">
                <Link href={RoutesInfo.Dashboard.path}><Button type="danger">Close Project</Button></Link>
            </div>
            <div className="right">
                <Button type="primary">Publish</Button>
                <Button style={{marginLeft: "5px"}} ghost>Preview</Button>
            </div>
        </Header>
    );
};

export default EditorNavHeader;
