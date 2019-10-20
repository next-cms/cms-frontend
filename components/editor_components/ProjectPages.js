import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Icon, message, Table} from "antd";
import {ClientContext, useMutation, useQuery} from "graphql-hooks";
import {ADD_PAGE, PROJECT_PAGES} from "../../utils/GraphQLConstants";
import {handleGraphQLAPIErrors} from "../../utils/helpers";
import Link from "next/link";
import RoutesInfo from "../../constants/RoutesInfo";
import Router from "next/router";

const ProjectDataStore = ({projectId}) => {
    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(100);

    const {loading, error, data, refetch} = useQuery(PROJECT_PAGES, {
        variables: {projectId, skip, limit: pageSize},
        skipCache: true
    });
    const graphQLClient = useContext(ClientContext);
    const [addPage] = useMutation(ADD_PAGE);

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading && !data) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading pages...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return null;
    const {allPages} = data;

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <Link href={`${RoutesInfo.ProjectPages.path}?projectId=${projectId}&pageName=${record.slug}`}>
                        <a>
                            <Icon style={{color: "blue"}} type="edit"/>
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

    const onAddPageClick = async (e) => {
        const result = await addPage({
            variables: {
                projectId: projectId
            }
        });
        if (!result.error) {
            const newPage = data.addPage;
            Router.push(`${RoutesInfo.ProjectPages.slug}?projectId=${projectId}&pageName=${newPage.slug}`,
                `${RoutesInfo.ProjectPages.slug}/?projectId=${projectId}&pageName=${newPage.slug}`);
        } else {
            handleGraphQLAPIErrors(result.error);
        }
    };

    return (
        <Fragment>
            <Button type="primary" onClick={onAddPageClick}>Add Page</Button>
            <Table dataSource={allPages} columns={columns} rowKey={"slug"}/>
        </Fragment>
    );
};

export default ProjectDataStore;
