import React, { useEffect, useState } from "react";
import { message, Radio, Select } from "antd";
import { useQuery } from "graphql-hooks";
import { ALL_LAYOUT_TEMPLATES } from "../../utils/GraphQLConstants";
import { handleGraphQLAPIErrors } from "../../utils/helpers";

const { Option } = Select;

const PageEditorComponent = ({ layout, pageName, projectId }) => {

    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [currentLayout, setCurrentLayout] = useState("layout1");
    const [ layoutData, setLayoutData ] = useState(null);

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
            hideMessage = message.loading("Loading all available layout...", 0);
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
        allLayoutTemplates.map(item => {
            if (e.target.value === item.name) {
                layoutData.name = item.name;
                layoutData.header = item.header;
                layoutData.footer = item.footer;
                layoutData.sider = item.sider;
            }
        });
        setLayoutData(layoutData);
        layout(layoutData);
    };

    return (
        <div>
            <div>
                <Radio.Group onChange={handleChange} value={currentLayout}>
                    {allLayoutTemplates.map(item => (
                        <Radio key={item.name} value={item.name}>
                            {item.name}
                            <div style={{ width: "250px", height: "150px", marginLeft: "25px", marginTop: "20px" }}>
                                <img width="100%" height="100%" src={`/images/layout/${item.name}.png`} alt={""}/>
                            </div>
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
        </div>
    );
};
export default PageEditorComponent;
