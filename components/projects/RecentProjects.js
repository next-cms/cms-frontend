import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Icon, Row, message } from "antd";
import { useQuery } from "graphql-hooks";
import { DataStoreContext } from "../../contexts/DataStoreContextProvider";
import getConfig from 'next/config'
import Link from "next/link";
const { publicRuntimeConfig } = getConfig();
const { PROJECT_PATH } = publicRuntimeConfig;

const { Meta } = Card;

export const recentProjectsQuery = `
  query recentProjectsQuery($limit: Int!, $skip: Int!) {
    projects(limit: $limit, skip: $skip) {
      id
      title
      description
      websiteUrl
      modifiedAt
    }
    _projectsMeta {
      count
    }
  }
`;

const RecentProjects = (props) => {
    const [skip, setSkip] = useState(0);
    const dataStoreContext = useContext(DataStoreContext);

    const { loading, error, data, refetch } = useQuery(recentProjectsQuery, {
        variables: { skip, limit: 4 },
        updateData: (prevResult, result) => ({
            ...result,
            projects: [...prevResult.projects, ...result.projects]
        })
    });

    useEffect(() => {
        if (dataStoreContext.projectListUpdated) {
            dataStoreContext.synced({ projectListUpdated: false });
            refetch({ variables: { skip, limit: 4 } });
        }
    }, [dataStoreContext.projectListUpdated]);

    let hideMessage;
    useEffect(() => {
        if (error) {
            message.error('Error loading recent projects.');
        }
        console.log("loading:", loading);
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading('Loading recent projects...', 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return <Row gutter={4} />;
    const { projects, _projectsMeta } = data;

    // const areMoreProjects = projects.length < _projectsMeta.count;
    return (
        <Row gutter={4}>
            {projects.map((project) => (
                <Col key={project.id} xs={24} sm={6}>
                    <Card
                        cover={<img alt="Default Project Cover"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                        actions={[<Link href={`${PROJECT_PATH}?id=${project.id}`}><a><Icon
                            type="edit" /></a></Link>, <Icon type="delete" />]}
                    >
                        <Meta title={project.title} description={project.description} />
                    </Card>
                </Col>))}
        </Row>
    );
};


RecentProjects.propTypes = {

};

export default RecentProjects;
