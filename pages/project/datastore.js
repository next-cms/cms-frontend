import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import { withAuthSync } from "../../utils/withAuthSync";
import * as PropTypes from "prop-types";
import { MenuContext } from "../../contexts/MenuContextProvider";
import ProjectDataStore from "../../components/editor_components/ProjectDataStore";
import RoutesInfo from "../../constants/RoutesInfo";
<<<<<<< HEAD
import RichTextEditor from "/home/vivasoft/Downloads/core_cms_frontend/components/common/rich_text_editor/slate/RichTextEditor.js";
=======
import RichTextEditor from "../../components/common/rich_text_editor/slate/RichTextEditor";
import RichTextViewer from "../../components/common/rich_text_editor/slate/RichTextViewer";
import ProjectDataStore from "../../components/editor_components/ProjectDataStore";
>>>>>>> 88233f69d3abfec4fd697c8586aee710574b5192

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
            padding: "20px"
        }}>
<<<<<<< HEAD
            <ProjectDataStore project={props.project} />
            <RichTextEditor />
=======
            {/* <RichTextEditor/> */}
            <ProjectDataStore project={props.project}/>
            {/* <RichTextViewer /> */}
>>>>>>> 88233f69d3abfec4fd697c8586aee710574b5192
        </PageWrapper>
    );
};

DataStore.propTypes = {
    project: PropTypes.object
};

export default withAuthSync(DataStore);
