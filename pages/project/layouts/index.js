import React, { Fragment } from "react";
import { Affix, Button, PageHeader } from "antd";
import EditorNavHeader from "../../../components/layout/header/EditorNavHeader";
import PageWrapper from "../../../components/common/PageWrapper";
import { useRouter } from "next/router";
import RoutesInfo from "../../../constants/RoutesInfo";
import { MenuContext } from "../../../contexts/MenuContextProvider";
import { withAuthSync } from "../../../utils/withAuthSync";
import Link from "next/link";

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
                    <EditorNavHeader>
                        <Link href={`${RoutesInfo.ProjectLayoutEditor.path}?projectId=${projectId}`}>
                            <div style={{ alignSelf: "flex-end", marginBottom: "5px" }}>
                                <Button type="primary">Create New Layout</Button>
                            </div>
                        </Link>
                    </EditorNavHeader>
                </div>
            </Affix>
            <PageWrapper style={{
                display: "flex",
                flex: "0 0 100%",
                flexDirection: "column",
                minHeight: "calc(100vh - 80px)",
                padding: "20px"
            }}>
                <PageHeader
                    title="Layout"
                    subTitle="Choose a new layout"
                />
                {/* TODO Create a table view to show all available layouts. Not the layout templates. */}
            </PageWrapper>
        </Fragment>
    );
};

export default withAuthSync(ProjectLayouts);
