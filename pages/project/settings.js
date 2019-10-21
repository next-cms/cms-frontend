import React, {Fragment} from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectSettings from "../../components/editor_components/ProjectSettings";
import RoutesInfo from "../../constants/RoutesInfo";
import EditorNavHeader from "../../components/layout/header/EditorNavHeader";
import {Affix} from "antd";

const Settings = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.ProjectSettings.slug]);
        menuContext.setOpenedKeys([]);
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
                padding: 0
            }}>
                <ProjectSettings project={props.project}/>
            </PageWrapper>
        </Fragment>
    );
};

Settings.propTypes = {
    project: PropTypes.object
};

export default withAuthSync(Settings);
