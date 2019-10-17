import React, { useState, useEffect } from "react";
import { Select, Input, message } from "antd";
import { ALL_DATAMODEL_TEMPLATES } from "../../utils/GraphQLConstants";
const { Option } = Select;
import { useQuery } from "graphql-hooks";
import { handleGraphQLAPIErrors } from "/home/vivasoft/Downloads/core_cms_frontend/utils/helpers";

const CreateNewModel = props => {
    const [modelData, setmodelData] = useState({
        type: "",
        name: "",
        templateTypeId: "",
        templateFields: ""
    });
    const { loading, error, data, refetch } = useQuery(ALL_DATAMODEL_TEMPLATES, {
        variables: { skip: 0, limit: 4 }
    });

    // const onChange = page => {
    //     setSkip((page - 1) * pageSize);
    //     setCurrent(page);
    // };

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
    const { allDataModelTemplates } = data;
    console.log("Templates: ", allDataModelTemplates);


    console.log("model data: ", modelData);
    // eslint-disable-next-line react/prop-types
    props.templateData(modelData);
    const options = (model) => {
        return model.map(item => {
            return (
                <Option key={item.name} value={item.name}>{item.name}</Option>
            );
        });
    };
    const getProperties = (key) => {
        allDataModelTemplates.map(item => {
            if (key === item.name) {
                console.log("templateId: ", item.id);
                console.log("templatefields: ", item.fields);
                setmodelData({
                    ...modelData,
                    templateTypeId: item.id,
                    templateFields: item.fields
                });
            }
        });
    };
    const handleInputChange = (e) => {
        setmodelData({
            ...modelData,
            type: e.target.value,
            name: e.target.value
        });
    };
    return (
        <div>
            <div style={{ padding: "20px 0px" }}>
                <h4>Which template do you want?</h4>
                <Select
                    style={{ width: 150 }}
                    name="template"
                    onSelect={(key) => {
                        getProperties(key);
                    }}
                    defaultValue="Select a template"
                >
                    {options(allDataModelTemplates)}
                </Select>
            </div>
            <h4>Type your model name: </h4>
            <Input style={{ width: "160px" }} name="modelName" onChange={handleInputChange} placeholder="Ex: News/Blog" />
        </div>
    );
};
export default CreateNewModel;