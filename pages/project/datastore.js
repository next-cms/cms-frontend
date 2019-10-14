import React from "react";
import dynamic from 'next/dynamic'
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import getConfig from "next/config";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectDataStore from "../../components/editor_components/ProjectDataStore";

const DynamicCKRTEditor = dynamic(
    () => import ("../../components/rich_text_editor/CKRTEditor"),
    {
        loading: () => <p>.....</p>,
        ssr: false
    }
)

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

export const DataStore = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([DataStore.routeInfo.slug]);
        menuContext.setOpenedKeys([]);
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <ProjectDataStore project={props.project}/>
            <DynamicCKRTEditor />
        </PageWrapper>
    );
};

DataStore.propTypes = {
    project: PropTypes.object
};

DataStore.routeInfo = {
    slug: "datastore",
    path: "/project/datastore",
    pathAs: "/project/datastore",
    title: "Data Store"
};

export default withAuthSync(DataStore);
