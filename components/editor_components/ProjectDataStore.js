import React, { useState, useEffect } from "react";
import { Button, Col, Row, Table, Icon, Divider, message } from "antd";
import ModalComponent from "../common/ModalComponent";
import CreateNewModel from "../common/CreateNewModel";
import * as moment from "moment";
import { ALL_DATAMODELS, ADD_DATAMODEL } from "../../utils/GraphQLConstants";
import { useQuery, useMutation } from "graphql-hooks";
import { withRouter } from "next/router";
import { handleGraphQLAPIErrors } from "/home/vivasoft/Downloads/core_cms_frontend/utils/helpers";

// eslint-disable-next-line react/prop-types
const ProjectDataStore = ({ router }) => {
    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [isModal, setIsModal] = useState(false);
    const [current, setCurrent] = useState(1);
    const [templateData, setTemplateData] = useState({});
    const [addDataModel] = useMutation(ADD_DATAMODEL);

    // eslint-disable-next-line react/prop-types
    const projectId = router.query.projectId;
    console.log("route: ", projectId);

    const { loading, error, data, refetch } = useQuery(ALL_DATAMODELS, {
        variables: { projectId, skip, limit: pageSize }
    });

    const onChange = page => {
        setSkip((page - 1) * pageSize);
        setCurrent(page);
    };

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        let hideMessage;
        if (loading && !data) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading data models...", 0);
        }
        else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) {
            return hideMessage;
        }

    }, [error, loading]);

    if (error || !data) return null;
    const { allDataModels, _allDataModelsMeta } = data;
    console.log("Data Models: ", allDataModels);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type"
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

    const getTemplateData = (value) => {
        setTemplateData(value);
    };

    const _handleCancel = () => {
        setIsModal(false);
    };

    const _handleOk = async (e) => {
        setIsModal(false);
        templateData.projectId = projectId;
        const result = await addDataModel({
            variables: { dataModel: templateData, projectId }
        });
        if (!result.error) {
            refetch({ variables: { projectId, skip, limit: pageSize } });
        }

    };

    const openModal = () => {
        setIsModal(true);
    };

    return (
        <div style={{ width: "100%", padding: "10px" }}>
            <Row style={{ marginBottom: "10px" }} type="flex" justify="space-between">
                <Col>
                    <h2>Title</h2>
                </Col>
                <Col>
                    <Button onClick={openModal} type="primary">Create Data Model</Button>
                </Col>
            </Row>
            <Table dataSource={allDataModels} columns={columns} pagination={{
                pageSize: pageSize,
                total: _allDataModelsMeta.count === null ? 0 : _allDataModelsMeta.count,
                current,
                onChange,

            }}
                rowKey="id" />
            <ModalComponent
                handleCancel={_handleCancel}
                handleOk={_handleOk}
                visible={isModal}
                okText="Next"
                title="Data Model Form"
            >
                <CreateNewModel templateData={getTemplateData} />
            </ModalComponent>
        </div>
    );
};

export default withRouter(ProjectDataStore);
