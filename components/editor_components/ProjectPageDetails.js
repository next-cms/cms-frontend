import React, { useEffect } from "react";
import { message, Row } from "antd";
import SimplePageBuilder from "./SimplePageBuilder";
import { useQuery } from "graphql-hooks";
import { DataStoreContext } from "../../contexts/DataStoreContextProvider";
import { PAGE_DETAILS } from "../../utils/GraphQLConstants";
import { handleGraphQLAPIErrors } from "../../utils/helpers";

const ProjectPageDetails = ({pageName, projectId}) => {
    // console.log("router", router);
    const dataStoreContext = React.useContext(DataStoreContext);

    // console.log(projectId, pageName);

    const {loading, error, data, refetch} = useQuery(PAGE_DETAILS, {
        variables: {projectId: projectId, page: pageName}
    });

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        let hideMessage;
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading page data...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    useEffect(() => {
        if (dataStoreContext.pageDetailsUpdated) {
            dataStoreContext.setPageDetailsUpdated(false);
            refetch({variables: {projectId: projectId, page: pageName}});
        }
    }, [dataStoreContext.pageDetailsUpdated]);

    if (error || !data) return <Row gutter={4}/>;

    // return (
    //     <SplitPanel>
    //         <ListPageComponents pageDetails={data.page}/>
    //         <SimplePageBuilder pageDetails={data.page} pageName={pageName}/>
    //         <ListComponentProperties pageDetails={data.page}/>
    //     </SplitPanel>
    // );
    return (
        <SimplePageBuilder pageDetails={data.page} pageName={pageName}/>
    );
};

export default ProjectPageDetails;
