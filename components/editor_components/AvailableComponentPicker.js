import React, {useEffect, useState} from "react";
import {Checkbox, Col, message, Row} from "antd";
import * as PropTypes from "prop-types";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {AVAILABLE_COMPONENTS} from "../../utils/GraphQLConstants";
import {handleGraphQLAPIErrors} from "../../utils/helpers";

const AvailableComponentPicker = ({onSelect, selectedComponents}) => {
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    //const dataStoreContext = useContext(DataStoreContext);
    const router = useRouter();
    const projectId = router.query.id;

    const { loading, error, data, refetch } = useQuery(
        AVAILABLE_COMPONENTS,
        {
            variables: {projectId, skip, limit: limit},
        }
    );

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
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

    if (error || !data) return <Row gutter={4} />;
    const { allAvailableComponents } = data;

    console.log("allAvailableComponents", allAvailableComponents);

    const getComponents = item => {
        return item.map(item => {
            return (<Col span={8} key={item.id}>
                <Checkbox value={item.id}>{item.name}</Checkbox>
            </Col>);
        });
    };

    const onChange = checkedValues => {
        console.log("checked = ", checkedValues);
        onSelect(checkedValues);
    };
    return (
        <Checkbox.Group style={{width: "100%"}} onChange={onChange} value={selectedComponents}>
            <Row>{getComponents(allAvailableComponents)}</Row>
        </Checkbox.Group>
    );
};

AvailableComponentPicker.propTypes = {
    onSelect: PropTypes.func,
    selectedComponents: PropTypes.array
};

export default AvailableComponentPicker;
