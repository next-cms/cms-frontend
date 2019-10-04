import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Collapse, Icon, Input} from "antd";
import * as PropTypes from "prop-types";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {clone, cloneDeep, set, startCase} from "lodash";
import JsonComponentList from "./JsonComponent";

const SAVE_COMPONENT_PROPERTIES_QUERY = `
mutation saveComponent($component: JSONObject!, $description: String, $websiteUrl: String!) {
  createProject(title: $title, description: $description, websiteUrl: $websiteUrl) {
    id
    title
    description
    websiteUrl
    createdAt
  }
}`;

const ListComponentProperties = ({pageDetails}) => {
    const dataStoreContext = useContext(DataStoreContext);
    const [openKeys, setOpenKeys] = useState([Object.keys(pageDetails)[0]]);
    const selectedProjectItem = dataStoreContext.selectedProjectItem;
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState(cloneDeep(selectedProjectItem));

    useEffect(() => {
        setItem(cloneDeep(selectedProjectItem));
    }, [selectedProjectItem]);

    const collapseOnChange = (key) => {
        console.log(key);
    };

    const handleTextInputChange = (object, path, value) => {
        console.log("handleTextInputChange", object, path, value);
        const newObject = clone(object);
        set(newObject, path, value);
        setItem(newObject);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleSave = e => {
        console.log(e);
        console.log("handleSave", item);
    };

    const handleJsonInputOk = e => {
        console.log(e);
        setVisible(false);
        handleSave(e);
    };

    const handleJsonInputCancel = e => {
        console.log(e);
        setVisible(false);
    };

    const generatePanelItem = item => {
        if (!item.props) return null;
        return Object.keys(item.props).map(attr => {
            return (
                <Fragment key={attr}>
                    <div>{startCase(attr)}:</div>
                    <div>
                        {(item.props[attr].type === "object" || item.props[attr].type === "element") ? (
                            <>
                                <Input disabled={true}
                                       style={{width: 190}}
                                       value={item.props[attr].value ? item.props[attr].value.value : attr}
                                />
                                <Button onClick={showModal}>
                                    <Icon type="edit"/>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Input
                                    onChange={(e) => handleTextInputChange(item, `props.["${attr}"].value.value`, e.target.value)}
                                    style={{width: 190}}
                                    value={item.props[attr].value ? item.props[attr].value.value : attr}
                                />
                                <Button style={{border: "1px solid green"}} onClick={handleSave}>
                                    <b>
                                        <Icon
                                            type="check"
                                            style={{color: "green"}}
                                        />
                                    </b>
                                </Button>
                            </>
                        )}
                    </div>
                    <br/>
                    <br/>
                    <JsonComponentList
                        visible={visible}
                        handleOk={handleJsonInputOk}
                        handleCancel={handleJsonInputCancel}
                    />
                </Fragment>
            );
        });
    };
    if (!item)
        return <p>Select an item to view the properties</p>;
    return (
        <Collapse
            defaultActiveKey={openKeys}
            onChange={collapseOnChange}
            style={{flex: "0 0 100%"}}
        >
            {generatePanelItem(item)}
        </Collapse>
    );
};

ListComponentProperties.propTypes = {
    pageDetails: PropTypes.object
};

export default ListComponentProperties;
