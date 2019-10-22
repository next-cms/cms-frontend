import React, {Fragment} from "react";
import PageWrapper from "../../../components/common/PageWrapper";
import {withAuthSync} from "../../../utils/withAuthSync";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../../contexts/MenuContextProvider";
import RoutesInfo from "../../../constants/RoutesInfo";
import ProjectDataStore from "../../../components/editor_components/ProjectDataStore";
import {Affix} from "antd";
import EditorNavHeader from "../../../components/layout/header/EditorNavHeader";

export const DataStore = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.DataStore.slug]);
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
                flexDirection: "column",
                minHeight: "calc(100vh - 80px)",
                padding: "20px"
            }}>
                {/* <RichTextEditor/> */}
                <ProjectDataStore project={props.project}/>
                {/* <RichTextViewer /> */}
            </PageWrapper>
        </Fragment>
    );
};

DataStore.propTypes = {
    project: PropTypes.object
};

export default withAuthSync(DataStore);
