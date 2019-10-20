import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Divider, Icon, message, Table} from "antd";
import {useMutation, useQuery} from "graphql-hooks";
import {ADD_PAGE, DELETE_PAGE, PROJECT_PAGES} from "../../utils/GraphQLConstants";
import {handleGraphQLAPIErrors} from "../../utils/helpers";
import Link from "next/link";
import RoutesInfo from "../../constants/RoutesInfo";
import Router from "next/router";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";

const ProjectPages = ({projectId}) => {
    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const dataStoreContext = useContext(DataStoreContext);

    const {loading, error, data, refetch} = useQuery(PROJECT_PAGES, {
        variables: {projectId, skip, limit: pageSize},
        skipCache: true
    });
    const [addPage] = useMutation(ADD_PAGE);
    const [deletePage] = useMutation(DELETE_PAGE);

    const onDeletePage = async (page) => {
        const result = await deletePage({
            variables: {
                projectId: projectId,
                page: page.slug
            }
        });
        if (!result.error) {
            refetch({variables: {projectId: projectId}});
            message.success(`Deleted page '${page.Title}' successfully!`);
        } else {
            handleGraphQLAPIErrors(result.error);
        }
    };

    const onAddPageClick = async (e) => {
        const result = await addPage({
            variables: {
                projectId: projectId
            }
        });
        if (!result.error) {
            const newPage = result.data.addPage;
            Router.push(`${RoutesInfo.ProjectPages.path}?projectId=${projectId}&pageName=${newPage.slug}`,
                `${RoutesInfo.ProjectPages.path}/?projectId=${projectId}&pageName=${newPage.slug}`);
        } else {
            handleGraphQLAPIErrors(result.error);
        }
    };

    useEffect(() => {
        if (dataStoreContext.projectPagesListUpdated) {
            refetch({variables: {projectId: projectId}});
            dataStoreContext.setProjectPagesListUpdated(false);
        }
    }, [dataStoreContext.projectPagesListUpdated]);

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
                    <Divider type="vertical"/>
                    {/*<Fragment>*/}
                    <a onClick={() => onDeletePage(record)}>
                        <Icon style={{color: "red"}} type="delete"/>
                    </a>

                    {/*</Fragment>*/}
                </span>
            )
        }
    ];

    return (
        <Fragment>
            <div>
                <Button type="primary" onClick={onAddPageClick}>Add Page</Button>
            </div>
            <Table dataSource={allPages} columns={columns} rowKey={"slug"}/>
        </Fragment>
    );
};

export default ProjectPages;
