import React, { Fragment } from "react";
import { Affix, Button, PageHeader, Table, Divider, Icon, } from "antd";
import EditorNavHeader from "../../../components/layout/header/EditorNavHeader";
import PageWrapper from "../../../components/common/PageWrapper";
import { useRouter } from "next/router";
import RoutesInfo from "../../../constants/RoutesInfo";
import { MenuContext } from "../../../contexts/MenuContextProvider";
import { withAuthSync } from "../../../utils/withAuthSync";
import Link from "next/link";

const ProjectLayouts = ({ }) => {

    const dataSource = [];

    const onDeleteLayout = (layout) => {
        console.log("Deleted layout", layout);
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
            title: "Sider",
            dataIndex: "sider",
            key: "sider",
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

    const menuContext = React.useContext(MenuContext);
    const router = useRouter();

    const projectId = router.query.projectId;

    React.useEffect(() => {
        menuContext.setOpenedKeys([RoutesInfo.ProjectLayouts.slug]);
    }, []);

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
                <Table dataSource={dataSource} columns={columns} />;
            </PageWrapper>
        </Fragment>
    );
};

export default withAuthSync(ProjectLayouts);
