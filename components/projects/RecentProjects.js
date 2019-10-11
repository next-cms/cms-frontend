import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Card, Col, Icon, message, Row} from "antd";
import {useQuery} from "graphql-hooks";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import getConfig from "next/config";
import Link from "next/link";
import DeleteWarningModal from "./DeleteWarningModal";
import {redirectTo} from "../common/Redirect";
import {RECENT_PROJECTS} from "../../utils/GraphQLConstants";
import {handleGraphQLAPIErrors} from "../../utils/helpers";

const { publicRuntimeConfig } = getConfig();
const { PROJECT_PATH } = publicRuntimeConfig;

const { Meta } = Card;

const RecentProjects = () => {
    const [skip, setSkip] = useState(0);
    const [visible, setVisible] = useState(false);
    const dataStoreContext = useContext(DataStoreContext);
    const [project, setProject] = useState({});

    const {loading, error, data, refetch} = useQuery(RECENT_PROJECTS, {
        variables: { skip, limit: 4 },
        updateData: (prevResult, result) => ({
            ...result,
            projects: [...prevResult.projects, ...result.projects]
        })
    });

    useEffect(() => {
        if (dataStoreContext.projectListUpdated) {
            dataStoreContext.setProjectListUpdated(false);
            refetch({ variables: { skip, limit: 4 } });
        }
    }, [dataStoreContext.projectListUpdated]);

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading recent projects...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return <Row gutter={4} />;
    const { projects, _projectsMeta } = data;

    const onCancel = () => {
        setVisible(false);
    };

    const handleDeleteClick = (project_handle) => {
        setVisible(true);
        setProject(project_handle);
    };
    const onDeleteProjectSuccess = () => {
        setVisible(false);
    };


    return (
        <Fragment>
            <Row gutter={4}>
                {projects.map(project => (
                    <Col key={project.id} xs={24} sm={6}>
                        <Card
                            cover={
                                <img
                                    onClick={() => redirectTo(`${PROJECT_PATH}?id=${project.id}`)}
                                    alt="Default Project Cover"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <Link href={`${PROJECT_PATH}?id=${project.id}`}>
                                    <a>
                                        <Icon type="edit" />
                                    </a>
                                </Link>,
                                <Button style={{border: 0, padding: 0}}
                                    onClick={() => {
                                        console.log("Id is: ", project);
                                        handleDeleteClick(project);
                                    }}
                                >
                                    <Icon type="delete" />
                                </Button>
                            ]}
                            hoverable
                        >
                            <Meta
                                onClick={() => redirectTo(`${PROJECT_PATH}?id=${project.id}`)}
                                title={project.title}
                                description={project.description}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
            <DeleteWarningModal
                visible={visible}
                project={project}
                handleCancel={onCancel}
                onSuccess={onDeleteProjectSuccess}
            />
        </Fragment>
    );
};

RecentProjects.propTypes = {};

export default RecentProjects;
