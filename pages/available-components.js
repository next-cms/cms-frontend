import React from "react";
import {PageHeader} from "antd";

import PageWrapper from "../components/common/PageWrapper";
import {withAuthSync} from "../utils/withAuthSync";
import {MenuContext} from "../contexts/MenuContextProvider";
import AvailableComponentList from "../components/common/AvailableComponentList";
import {DEFAULT_AVAILABLE_COMPONENTS} from "../utils/GraphQLConstants";
import RoutesInfo from "../constants/RoutesInfo";

const AvailableComponents = () => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.AvailableComponents.slug]);
    }, []);

    const pageHeader = <PageHeader title="Available Components" subTitle="List of supported and available components"/>;

    return (
        <PageWrapper pageHeader={pageHeader}>
            <AvailableComponentList query={DEFAULT_AVAILABLE_COMPONENTS}/>
        </PageWrapper>
    );
};

export default withAuthSync(AvailableComponents);
