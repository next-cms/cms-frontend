import React from "react";
import {PageHeader} from "antd";

import PageWrapper from "../components/common/PageWrapper";
import ProjectCreateForm from "../components/projects/ProjectCreateForm";
import {withAuthSync} from "../utils/withAuthSync";
import {MenuContext} from "../contexts/MenuContextProvider";
import RoutesInfo from "../constants/RoutesInfo";

const CreateProject = () => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.CreateProject.slug]);
    }, []);

    const pageHeader = <PageHeader title="Create Project" subTitle="Create a new NextJS project"/>;

    return (
        <PageWrapper pageHeader={pageHeader}>
            <ProjectCreateForm/>
        </PageWrapper>
    );
};

export default withAuthSync(CreateProject);
