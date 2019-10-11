import React, { Fragment } from "react";
import { Row, Col, Table } from "antd";
import { Button } from "antd";

const ProjectDataStore = () => {

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];


    return (
        <div style={{width: "100%", padding: "10px"}}>
            <Row style={{marginBottom: "10px"}} type="flex" justify="space-between">
                <Col>
                    <h2>Title</h2>
                </Col>
                <Col>
                    <Button type="primary">Create Data Model</Button>
                </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default ProjectDataStore;
