import React, {Fragment} from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectPages from "../../components/editor_components/ProjectPages";
import {useRouter} from "next/router";
import RoutesInfo from "../../constants/RoutesInfo";
import EditorNavHeader from "../../components/layout/header/EditorNavHeader";
import ProjectPageDetails from "../../components/editor_components/ProjectPageDetails";
import {Affix} from "antd";

const Pages = (props) => {
    const menuContext = React.useContext(MenuContext);
    const router = useRouter();

    const projectId = router.query.projectId;
    const pageName = router.query.pageName;

    React.useEffect(() => {
        menuContext.setOpenedKeys([RoutesInfo.ProjectPages.slug]);
    }, []);

    if (pageName) {
        return (
            <Fragment>
                <Affix>
                    <div>
                        <EditorNavHeader>

                        </EditorNavHeader>
                    </div>
                </Affix>
                <PageWrapper style={{
                    display: "flex",
                    flex: "0 0 100%",
                    minHeight: "calc(100vh - 80px)",
                    padding: 0
                }}>
                    <ProjectPageDetails pageName={pageName} projectId={projectId}/>
                </PageWrapper>
            </Fragment>
        );
    }

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
                <ProjectPages projectId={projectId}/>
            </PageWrapper>
        </Fragment>
    );
};

Pages.propTypes = {};

export default withAuthSync(Pages);
