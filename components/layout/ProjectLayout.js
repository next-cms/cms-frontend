import React, {useContext, useEffect} from "react";
import {withRouter} from "next/router";
import {useQuery} from "graphql-hooks";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {message, Row} from "antd";
import {getProjectMenuItems} from "../../components/layout/aside/ProjectMenuItems";
import CommonLayout from "../../components/layout/CommonLayout";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import {PROJECT_DETAILS} from "../../utils/GraphQLConstants";

const ProjectLayout = ({router, children}) => {
    let projectId = router.query.projectId;

    const {loading, error, data, refetch} = useQuery(PROJECT_DETAILS, {
        variables: {projectId},
        updateData: (prevResult, result) => ({
            project: result.project
        })
    });

    const menuContext = React.useContext(MenuContext);
    const dataStoreContext = useContext(DataStoreContext);

    const menuItems = getProjectMenuItems({
        query: {projectId},
    });

    React.useEffect(() => {
        menuContext.setMenuItems(menuItems);
    }, []);

    let hideMessage;
    useEffect(() => {
        if (error) {
            message.error("Error loading project.");
        }
        console.log("loading:", loading);
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading project...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
            console.log("currentProject is", data);
            dataStoreContext.setCurrentProject(data.project);
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    useEffect(() => {
        if (dataStoreContext.projectUpdated) {
            refetch();
            dataStoreContext.setProjectUpdated(false);
        }
    }, [dataStoreContext.projectUpdated]);

    // useEffect(() => {
    //     console.log("currentProject is", data);
    //     if (data.project) {
    //         dataStoreContext.setCurrentProject(data.project);
    //     }
    // }, [data.project]);

    if (error || !data) return <Row gutter={4}/>;

    return (
        <CommonLayout>
            {children}
        </CommonLayout>
    );
};

ProjectLayout.propTypes = {
    children: PropTypes.element.isRequired,
    router: PropTypes.object,
};

export default withRouter(ProjectLayout);
