import React from "react";
import dynamic from 'next/dynamic'
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectDataStore from "../../components/editor_components/ProjectDataStore";
import RoutesInfo from "../../constants/RoutesInfo";
import SlateTextEditor from "../../components/common/rich_text_editor/slate/SlateTextEditor";

// const DynamicCKRTEditor = dynamic(
//     () => import ("../../components/common/rich_text_editor/CKRTEditor"),
//     {
//         loading: () => <p>.....</p>,
//         ssr: false
//     }
// )

// const DynamicCKRTEditorDocumet = dynamic(
//     () => import ("../../components/common/rich_text_editor/CKRTEditorDocumet"),
//     {
//         loading: () => <p>.....</p>,
//         ssr: false
//     }
// )

export const DataStore = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.DataStore.slug]);
        menuContext.setOpenedKeys([]);
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            flexDirection: "column",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <ProjectDataStore project={props.project}/>
            <SlateTextEditor />
            {/* <DynamicCKRTEditor defaultValue=""  /> */}
            {/* <DynamicCKRTEditorDocumet title="CKEditor 5 using a custom build - DecoupledEditor"  defaultValue="Ready to edit"/> */}
        </PageWrapper>
    );
};

DataStore.propTypes = {
    project: PropTypes.object
};

export default withAuthSync(DataStore);
