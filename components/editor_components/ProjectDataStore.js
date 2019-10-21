import React, { useEffect, useState, Fragment } from "react";
import { Table, message, Button } from "antd";
import { useQuery } from "graphql-hooks";
import { ALL_DATA_OBJECTS_BY_TYPE, ALL_DATA_MODELS } from "../../utils/GraphQLConstants";
import { handleGraphQLAPIErrors } from "../../utils/helpers";
import { useRouter } from "next/router";
import Link from "next/link";
import RoutesInfo from "../../constants/RoutesInfo";

const ProjectDataStore = () => {

    const router = useRouter();
    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [projectId, setProjectId] = useState(router.query.projectId);

    // const {loading, error, data, refetch} = useQuery(ALL_DATA_MODELS, {
    //     variables: {skip, limit: pageSize},
    //     skipCache: true
    // });

    const { loading, error, data, refetch } = useQuery(ALL_DATA_OBJECTS_BY_TYPE, {
        variables: { projectId, type: "post", skip, limit: pageSize },
        skipCache: true
    });

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading && !data) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading recent projects...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    const dataSource = [
        {
            projectId: "1",
            type: "Mike",
            createdAt: 32,
            modifiedAt: "10 Downing Street",
        },
        {
            projectId: "2",
            type: "John",
            createdAt: 42,
            modifiedAt: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "Project Id",
            dataIndex: "projectId",
            key: "projectId",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Modified At",
            dataIndex: "modifiedAt",
            key: "modifiedAt",
        },
    ];


    return (
        <Fragment>
            <Link href={`${RoutesInfo.Post.slug}?projectId=${projectId}&postId=new`}>
                <Button type="primary">Add Post</Button>
            </Link>
            <Table dataSource={dataSource} columns={columns} rowKey={"projectId"} />
        </Fragment>
    );
};

export default ProjectDataStore;