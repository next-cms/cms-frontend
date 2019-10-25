import React, { Fragment, useEffect, useState, useContext } from "react";
import { Affix, Button, PageHeader, Table, Divider, Icon, message, Modal } from "antd";
import EditorNavHeader from "../../../components/layout/header/EditorNavHeader";
import PageWrapper from "../../../components/common/PageWrapper";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "graphql-hooks";
import RoutesInfo from "../../../constants/RoutesInfo";
import { MenuContext } from "../../../contexts/MenuContextProvider";
import { withAuthSync } from "../../../utils/withAuthSync";
import Link from "next/link";
import { ALL_CREATED_LAYOUTS, DELETE_LAYOUT } from "../../../utils/GraphQLConstants";

const ProjectLayouts = ({ }) => {

    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [deletedLayout, setDeletedLayout] = useState();
    const [visible, setVisible] = useState(false);

    const menuContext = React.useContext(MenuContext);
    const router = useRouter();
    const [deleteLayout, setDeleteLayout] = useMutation(DELETE_LAYOUT);

    const projectId = router.query.projectId;

    const { loading, error, data, refetch } = useQuery(ALL_CREATED_LAYOUTS, {
        variables: { projectId, skip, limit: pageSize },
        skipCache: true
    });

    useEffect(() => {
        menuContext.setOpenedKeys([RoutesInfo.ProjectLayouts.slug]);
    }, []);

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading && !data) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading all available layout templates...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return null;

    const { allLayoutsByProject, _allLayoutsByProjectMeta } = data;

    const onDeleteLayout = (layout) => {
        console.log("Deleted layout", layout);
        setDeletedLayout(layout);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onSuccess = () => {
        setVisible(false);
    };

    const deleteHandler = async () => {
        const result = await deleteLayout({ variables: { id: deletedLayout.id, projectId: projectId } });
        if (!result.error) {
            onSuccess && onSuccess();
            refetch({ variables: { projectId, skip, limit: pageSize } });
        } else {
            message.error((result.httpError && result.httpError.statusText) ||
                (result.graphQLErrors && result.graphQLErrors[0].message));
        }
    };

    const columns = [
        {
            title: "Layout Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Header",
            dataIndex: "header",
            key: "header",
        },
        {
            title: "Footer",
            dataIndex: "footer",
            key: "footer",
        },
        {
            title: "Left Sider",
            dataIndex: "leftSider",
            key: "leftSider",
        },
        {
            title: "Right Sider",
            dataIndex: "rightSider",
            key: "rightSider",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <Link href={`${RoutesInfo.ProjectLayoutEditor.path}?projectId=${projectId}&layoutId=${record.id}`}>
                        <a>
                            <Icon style={{ color: "blue" }} type="edit" />
                        </a>
                    </Link>
                    <Divider type="vertical" />
                    <Fragment>
                        <a onClick={() => onDeleteLayout(record)}>
                            <Icon style={{ color: "red" }} type="delete" />
                        </a>
                    </Fragment>
                </span>
            )
        }
    ];

    return (
        <Fragment>
            <Affix>
                <div>
                    <EditorNavHeader>
                        <Link href={`${RoutesInfo.ProjectLayoutEditor.path}?projectId=${projectId}`}>
                            <div style={{ alignSelf: "flex-end", marginBottom: "5px" }}>
                                <Button type="primary">Create New Layout</Button>
                            </div>
                        </Link>
                    </EditorNavHeader>
                </div>
            </Affix>
            <PageWrapper style={{
                display: "flex",
                flex: "0 0 100%",
                flexDirection: "column",
                minHeight: "calc(100vh - 80px)",
                padding: "20px"
            }}>
                <PageHeader
                    title="Layout"
                    subTitle="Choose a new layout"
                />
                <Table dataSource={allLayoutsByProject} columns={columns} rowKey="id" />

            </PageWrapper>
            <Modal
                title="Delete Layout"
                okText="Yes"
                okType="danger"
                cancelText="No"
                visible={visible}
                onOk={deleteHandler}
                onCancel={handleCancel}
            >
                <p>Do you want to delete {!deletedLayout ? "" : deletedLayout.name}?</p>
            </Modal>

        </Fragment>
    );
};

export default withAuthSync(ProjectLayouts);
