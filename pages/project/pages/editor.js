import React, { Fragment } from "react";
import PageWrapper from "../../../components/common/PageWrapper";
import { withAuthSync } from "../../../utils/withAuthSync";
import { MenuContext } from "../../../contexts/MenuContextProvider";
import { useRouter } from "next/router";
import RoutesInfo from "../../../constants/RoutesInfo";
import EditorNavHeader from "../../../components/layout/header/EditorNavHeader";
import { Affix } from "antd";
import PageEditorComponent from "../../../components/editor_components/PageEditorComponent";

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
            }}>
                <PageEditorComponent pageName={pageName} projectId={projectId}/>
            </PageWrapper>
        </Fragment>
    );
};

Pages.propTypes = {};

export default withAuthSync(Pages);
