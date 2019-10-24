import React, { useEffect, useState } from "react";
import { message, Modal, Radio } from "antd";
import { useQuery } from "graphql-hooks";
import { ALL_LAYOUT_TEMPLATES } from "../../utils/GraphQLConstants";
import { handleGraphQLAPIErrors } from "../../utils/helpers";
import { startCase } from "lodash";

const LayoutTemplateSelectionModal = ({ visible, handleOk, handleCancel, currentLayout }) => {
    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [selectedLayoutName, setSelectedLayoutName] = useState(currentLayout ? currentLayout.name : "");

    const { loading, error, data, refetch } = useQuery(ALL_LAYOUT_TEMPLATES, {
        variables: { skip, limit: pageSize },
        skipCache: true
    });
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
    const { allLayoutTemplates, _allLayoutTemplatesMeta } = data;

    const handleChange = (e) => {
        console.log(`selected ${e.target.value}`);
        setSelectedLayoutName(e.target.value);
    };

    const _handleOk = (e) => {
        const selected = allLayoutTemplates.filter((temp) => {
            return temp.name === selectedLayoutName;
        });
        console.log("selected: ", selected);
        handleOk(selected.length ? selected[0] : null);
    };

    return (
        <Modal
            title="Select A Template"
            visible={visible}
            onOk={_handleOk}
            okText="OK"
            onCancel={handleCancel}
        >
            <Radio.Group onChange={handleChange} value={selectedLayoutName}
                style={{ maxHeight: "500px", overflowY: "auto" }}>
                {allLayoutTemplates.map((item) => (
                    <Radio key={item.name} value={item.name}>
                        {startCase(item.name)}
                        <div style={{ width: "250px", height: "150px", marginLeft: "25px", marginTop: "20px" }}>
                            <img width="100%" height="100%" src={`/images/layout/${item.name}.png`} alt={""} />
                        </div>
                    </Radio>
                ))}
            </Radio.Group>
        </Modal>
    );
};
export default LayoutTemplateSelectionModal;
