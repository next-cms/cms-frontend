import React, {useState} from "react";
import {Button, Col, Row, Table} from "antd";
import ModalComponent from "../common/ModalComponent";

const ProjectDataStore = () => {

    const [isModal, setIsModal] = useState(false);

    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
    ];

    const _handleCancel = () => {
        setIsModal(false);
    };

    const _handleOk = (e) => {
        console.log(e);
        setIsModal(false);
    };

    const openModal = () => {
        setIsModal(true);
    };

    return (
        <div style={{width: "100%", padding: "10px"}}>
            <Row style={{marginBottom: "10px"}} type="flex" justify="space-between">
                <Col>
                    <h2>Title</h2>
                </Col>
                <Col>
                    <Button onClick={openModal} type="primary">Create Data Model</Button>
                </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns}/>
            <ModalComponent
                handleCancel={_handleCancel}
                handleOk={_handleOk}
                visible={isModal}
                title="Data Model Form"
            >
                <h2>I'm data model form modal.</h2>
            </ModalComponent>
        </div>
    );
};

export default ProjectDataStore;
