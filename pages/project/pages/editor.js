import React, { Fragment } from "react";
import PageWrapper from "../../../components/common/PageWrapper";
import { withAuthSync } from "../../../utils/withAuthSync";
import { MenuContext } from "../../../contexts/MenuContextProvider";
import { useRouter } from "next/router";
import RoutesInfo from "../../../constants/RoutesInfo";
import EditorNavHeader from "../../../components/layout/header/EditorNavHeader";
import { Affix } from "antd";
import ProjectPageDetails from "../../../components/editor_components/ProjectPageDetails";

const Pages = (props) => {
    const menuContext = React.useContext(MenuContext);
    const router = useRouter();

    const projectId = router.query.projectId;
    const pageName = router.query.pageName;

    React.useEffect(() => {
        menuContext.setOpenedKeys([ RoutesInfo.ProjectPages.slug ]);
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
                minHeight: "calc(100vh - 80px)",
                padding: "5px"
            }}>
                <ProjectPageDetails pageName={pageName} projectId={projectId}/>
            </PageWrapper>
        </Fragment>
    );
};

Pages.propTypes = {};

export default withAuthSync(Pages);
