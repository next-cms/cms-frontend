import React, {Fragment} from "react";
import {Affix, PageHeader} from "antd";

import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import {MenuContext} from "../../contexts/MenuContextProvider";
import AvailableComponentList from "../../components/common/AvailableComponentList";
import {DEFAULT_AVAILABLE_COMPONENTS} from "../../utils/GraphQLConstants";
import RoutesInfo from "../../constants/RoutesInfo";
import EditorNavHeader from "../../components/layout/header/EditorNavHeader";

const AvailableComponents = () => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.ProjectAvailableComponents.slug]);
    }, []);

    const pageHeader = <PageHeader title="Available Components" subTitle="List of supported and available components"/>;

    return (
        <Fragment>
            <Affix>
                <div>
                    <EditorNavHeader/>
                </div>
            </Affix>
            <PageWrapper pageHeader={pageHeader}>
                <AvailableComponentList query={DEFAULT_AVAILABLE_COMPONENTS}/>
            </PageWrapper>
        </Fragment>
    );
};

export default withAuthSync(AvailableComponents);
