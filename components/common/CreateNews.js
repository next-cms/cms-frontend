import React, { Fragment } from "react";
import { Button, Table, Icon, Divider } from "antd";

const CreateNews = () => {
    const dataSource = [
        {
            key: "1",
            type: "Blog",
            modelType: "News",
            createdAt: "20 Sep, 2019",
            modifiedAt: "20 Sep, 2019"
        },
        {
            key: "2",
            type: "Blog",
            modelType: "News",
            createdAt: "20 Sep, 2019",
            modifiedAt: "20 Sep, 2019"
        }
    ];

    const columns = [
        {
            title: "Type",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "ModelType",
            dataIndex: "modelType",
            key: "modelType"
        },
        {
            title: "CreatedAt",
            dataIndex: "createdAt",
            key: "createdAt"
        },
        {
            title: "ModifiedAt",
            dataIndex: "modifiedAt",
            key: "modifiedAt"
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <a>
                        <Icon type="edit" />
                    </a>
                    <Divider type="vertical" />
                    <a>
                        <Icon type="delete" />
                    </a>
                </span>
            )
        }
    ];
    return (
        <Fragment>
            <div style={{ padding: "20px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>Create News</h2>
                    <Button href="#" type="primary">Create News</Button>
                </div>
                <div>
                    <Table dataSource={dataSource} columns={columns} />;
                </div>
            </div>
        </Fragment>
    );
};
export default CreateNews;