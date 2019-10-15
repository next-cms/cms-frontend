import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import RoutesInfo from "../../constants/RoutesInfo";
import RichTextEditor from "../../components/common/rich_text_editor/slate/RichTextEditor";

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
            <RichTextEditor/>
            {/*<ProjectDataStore project={props.project}/>*/}
        </PageWrapper>
    );
};

DataStore.propTypes = {
    project: PropTypes.object
};

export default withAuthSync(DataStore);
