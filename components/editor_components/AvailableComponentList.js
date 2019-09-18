import React, {useEffect, useState} from "react";
import {Checkbox, Col, message, Row} from "antd";
import * as PropTypes from "prop-types";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";

export const availableComponentQuery = `
  query availableComponentQuery($projectId: String!, $limit: Int!, $skip: Int!) {
    allAvailableComponents(projectId: $projectId, limit: $limit, skip: $skip) {
      id
      name
      props
    }
  }
`;

const AvailableComponentList = ({onSelect}) => {
    const [skip, setSkip] = useState(0);
    // const dataStoreContext = useContext(DataStoreContext);
    const router = useRouter();
    const projectId = router.query.id;

    const {loading, error, data, refetch} = useQuery(availableComponentQuery, {
        variables: {projectId, skip, limit: 4},
        updateData: (prevResult, result) => ({
            ...result,
            allAvailableComponents: [...prevResult.allAvailableComponents, ...result.allAvailableComponents]
        })
    });

    // useEffect(() => {
    //     if (dataStoreContext.projectListUpdated) {
    //         dataStoreContext.setProjectListUpdated(false);
    //         refetch({variables: {skip, limit: 4}});
    //     }
    // }, [dataStoreContext.projectListUpdated]);

    useEffect(() => {
        if (error) {
            message.error("Error retrieving available components.");
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading available components...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return <Row gutter={4}/>;
    const {allAvailableComponents} = data;

    console.log("allAvailableComponents", allAvailableComponents);

    const onChange = checkedValues => {
        console.log("checked = ", checkedValues);
        onSelect(checkedValues);
    };
    return (
        <Checkbox.Group style={{width: "100%"}} onChange={onChange}>
            <Row>
                <Col span={8}>
                    <Checkbox value="A">Div</Checkbox>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Checkbox value="B">Span</Checkbox>
                </Col>
                <Row>
                    <Col span={8}>
                        <Checkbox value="C">Button</Checkbox>
                    </Col>
                </Row>
                <Col span={8}>
                    <Checkbox value="D">Image</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="E">Menu</Checkbox>
                </Col>
            </Row>
        </Checkbox.Group>
    );
};

AvailableComponentList.propTypes = {
    onSelect: PropTypes.func
};

export default AvailableComponentList;
