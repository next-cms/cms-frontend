import React, { Fragment, useEffect, useState } from "react";
import { Button, Icon, message, Table } from "antd";
import { useQuery } from "graphql-hooks";
import { ALL_DATA_OBJECTS_BY_TYPE } from "../../utils/GraphQLConstants";
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
            hideMessage = message.loading("Loading posts...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return null;
    const { allDataObjectsByType } = data;

    const columns = [
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
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
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <Link href={`${RoutesInfo.PostEditor.path}?projectId=${projectId}&postId=${record.id}`}>
                        <a>
                            <Icon style={{ color: "blue" }} type="edit" />
                        </a>
                    </Link>
                    {/*<Divider type="vertical"/>*/}
                    {/*<Fragment>*/}
                    {/*<a onClick={() => handleClick(record)}>*/}
                    {/*<Icon style={{color: "red"}} type="delete"/>*/}
                    {/*</a>*/}

                    {/*</Fragment>*/}
                </span>
            )
        }
    ];


    return (
        <Fragment>
            <Link href={`${RoutesInfo.PostEditor.path}?projectId=${projectId}&postId=new`}>
                <div style={{alignSelf: "flex-end", marginBottom: "5px"}}>
                    <Button type="primary">Add Post</Button>
                </div>
            </Link>
            <Table dataSource={allDataObjectsByType} columns={columns} rowKey={"id"} />
        </Fragment>
    );
};

export default ProjectDataStore;
