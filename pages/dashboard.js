import React, {Fragment, useContext, useEffect, useState} from "react";
import {Affix, Button, Divider, Icon, message, PageHeader, Table, Typography} from "antd";
import Link from "next/link";
import "../styles/scss/dashboard.scss";
import PageWrapper from "../components/common/PageWrapper";
import RecentProjects from "../components/projects/RecentProjects";
import {withAuthSync} from "../utils/withAuthSync";
import {useQuery} from "graphql-hooks";
import {DataStoreContext} from "../contexts/DataStoreContextProvider";
import DeleteWarningModal from "../components/projects/DeleteWarningModal";
import {ALL_PROJECTS_QUERY} from "../utils/GraphQLConstants";
import {MenuContext} from "../contexts/MenuContextProvider";
import {handleGraphQLAPIErrors} from "../utils/helpers";
import RoutesInfo from "../constants/RoutesInfo";
import {MetaRedirect} from "../components/common/Redirect";
import DefaultNavHeader from "../components/layout/header/DefaultNavHeader";

const {Title} = Typography;

const Dashboard = () => {
    if (process.env.SINGLE_PROJECT_MODE === "true") {
        return (
            <MetaRedirect to={RoutesInfo.Home.path}/>
        );
    }
    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const dataStoreContext = useContext(DataStoreContext);
    const menuContext = useContext(MenuContext);
    const [current, setCurrent] = useState(1);
    const [visible, setVisible] = useState(false);
    const [project, setProject] = useState({});

    const {loading, error, data, refetch} = useQuery(ALL_PROJECTS_QUERY, {
        variables: {skip, limit: pageSize},
        skipCache: true
    });

    const onChange = page => {
        console.log("Page no is: ", page);
        setSkip((page - 1) * pageSize);
        setCurrent(page);
    };

    useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.Dashboard.slug]);
    }, []);

    useEffect(() => {
        if (dataStoreContext.projectListUpdated) {
            dataStoreContext.setProjectListUpdated(false);
            refetch({variables: {skip, limit: pageSize}});
        }
    }, [dataStoreContext.projectListUpdated]);

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

    if (error || !data) return null;
    const {projects, _projectsMeta} = data;

    const onCancel = () => {
        setVisible(false);
    };

    const handleClick = (project_handle) => {
        setVisible(true);
        setProject(project_handle);
    };
    const onDeleteProjectSuccess = () => {
        setVisible(false);
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Website URL",
            dataIndex: "websiteUrl",
            key: "websiteUrl"
        },
        {
            title: "Modified At",
            dataIndex: "modifiedAt",
            key: "modifiedAt"
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <Link href={`${RoutesInfo.Project.path}?projectId=${record.id}`}>
                        <a>
                            <Icon style={{color: "blue"}} type="edit"/>
                        </a>
                    </Link>
                    <Divider type="vertical"/>
                    <Fragment>
                        <a onClick={() => handleClick(record)}>
                            <Icon style={{color: "red"}} type="delete"/>
                        </a>

                    </Fragment>
                </span>
            )
        }
    ];

    const pageHeader = (
        <PageHeader
            title="Dashboard"
            subTitle="Choose a project or create a new one"
            extra={
                <Link href={RoutesInfo.CreateProject.path}>
                    <Button type="primary">New Project</Button>
                </Link>
            }
        />
    );

    return (
        <Fragment>
            <Affix>
                <div>
                    <DefaultNavHeader/>
                </div>
            </Affix>
            <PageWrapper pageHeader={pageHeader}>
                <Fragment>
                    <Title level={3}>Recent Project</Title>
                    <RecentProjects/>

                    <Divider/>

                    <Title level={3}>All Project</Title>
                    <Table
                        dataSource={projects}
                        columns={columns}
                        pagination={{
                            pageSize: pageSize,
                            total: _projectsMeta.count,
                            current,
                            onChange
                        }}
                        rowKey="id"
                    />
                    <DeleteWarningModal
                        visible={visible}
                        project={project}
                        handleCancel={onCancel}
                        onSuccess={onDeleteProjectSuccess}

                    />
                </Fragment>
            </PageWrapper>
        </Fragment>
    );
};

export default withAuthSync(Dashboard);
