import React, { Fragment } from "react";
import { Affix } from "antd";
import EditorNavHeader from "../../components/layout/header/EditorNavHeader";
import PageWrapper from "../../components/common/PageWrapper";
import LayoutEditorComponent from "../../components/editor_components/LayoutEditorComponent";
import { useRouter } from "next/router";
import RoutesInfo from "../../constants/RoutesInfo";
import { MenuContext } from "../../contexts/MenuContextProvider";
import { withAuthSync } from "../../utils/withAuthSync";

const ProjectLayouts = ({}) => {
    const menuContext = React.useContext(MenuContext);
    const router = useRouter();

    const projectId = router.query.projectId;

    React.useEffect(() => {
        menuContext.setOpenedKeys([ RoutesInfo.ProjectLayouts.slug ]);
    }, []);

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
                <LayoutEditorComponent projectId={projectId}/>
            </PageWrapper>
        </Fragment>
    );
};

export default withAuthSync(ProjectLayouts);
