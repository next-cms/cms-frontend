import React, {useEffect} from "react";
import {withAuthSync} from "../utils/withAuthSync";
import {MetaRedirect} from "../components/common/Redirect";
import RoutesInfo from "../constants/RoutesInfo";
import {useQuery} from "graphql-hooks";
import {ALL_PROJECTS_QUERY} from "../utils/GraphQLConstants";
import {handleGraphQLAPIErrors} from "../utils/helpers";
import {message} from "antd";

const Home = () => {
    if (process.env.SINGLE_PROJECT_MODE !== "true") {
        return (
            <MetaRedirect to={RoutesInfo.Dashboard.path}/>
        );
    }
    const skip = 0;
    const pageSize = 1;

    const {loading, error, data} = useQuery(ALL_PROJECTS_QUERY, {
        variables: {skip, limit: pageSize}
    });

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading && !data) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading project...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return null;
    const {projects} = data;
    if (projects.length) {
        return (
            <MetaRedirect to={`${RoutesInfo.Project.path}?projectId=${projects[0].id}`}/>
        );
    } else {
        return (
            <MetaRedirect to={RoutesInfo.CreateProject.path}/>
        );
    }
};

export default withAuthSync(Home);
