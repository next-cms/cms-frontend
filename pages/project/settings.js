import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectSettings from "../../components/editor_components/ProjectSettings";
import RoutesInfo from "../../constants/RoutesInfo";

const Settings = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.ProjectSettings.slug]);
        menuContext.setOpenedKeys([]);
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <ProjectSettings project={props.project}/>
        </PageWrapper>
    );
};

Settings.propTypes = {
    project: PropTypes.object
};

export default withAuthSync(Settings);
