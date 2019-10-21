import React, {Fragment} from "react";
import {Affix, PageHeader} from "antd";

import PageWrapper from "../components/common/PageWrapper";
import ProjectCreateForm from "../components/projects/ProjectCreateForm";
import {withAuthSync} from "../utils/withAuthSync";
import {MenuContext} from "../contexts/MenuContextProvider";
import RoutesInfo from "../constants/RoutesInfo";
import DefaultNavHeader from "../components/layout/header/DefaultNavHeader";

const CreateProject = () => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.CreateProject.slug]);
    }, []);

    const pageHeader = <PageHeader title="Create Project" subTitle="Create a new NextJS project"/>;

    return (
        <Fragment>
            <Affix>
                <div>
                    <DefaultNavHeader/>
                </div>
            </Affix>
            <PageWrapper pageHeader={pageHeader}>
                <ProjectCreateForm/>
            </PageWrapper>
        </Fragment>
    );
};

export default withAuthSync(CreateProject);
