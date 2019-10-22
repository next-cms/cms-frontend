import React, { Fragment } from "react";
import { Affix } from "antd";
import EditorNavHeader from "../../components/layout/header/EditorNavHeader";
import PageWrapper from "../../components/common/PageWrapper";

const ProjectLayouts = ({}) => {
    return (
        <Fragment>
            <Affix>
                <div>
                    <EditorNavHeader/>
                </div>
            </Affix>
            <PageWrapper style={{
                display: "flex",
                flex: "0 0 100%",
                flexDirection: "column",
                minHeight: "calc(100vh - 80px)",
                padding: "20px"
            }}>
                Layouts
            </PageWrapper>
        </Fragment>
    );
};
export default ProjectLayouts;
