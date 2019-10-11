import React from "react";
import {PageHeader} from "antd";

import PageWrapper from "../components/common/PageWrapper";
import ProjectCreateForm from "../components/projects/ProjectCreateForm";
import {withAuthSync} from "../utils/withAuthSync";
import {MenuContext} from "../contexts/MenuContextProvider";

export const CreateProject = () => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([CreateProject.routeInfo.slug]);
    }, []);

    const pageHeader = <PageHeader title="Create Project" subTitle="Create a new NextJS project"/>;

    return (
        <PageWrapper pageHeader={pageHeader}>
            <ProjectCreateForm/>
        </PageWrapper>
    );
};

CreateProject.routeInfo = {
    slug: "create-project",
    path: "/create-project",
    pathAs: "/create-project"
};
export default withAuthSync(CreateProject);
