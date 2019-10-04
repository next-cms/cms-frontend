import React, {Fragment, useContext, useState} from "react";
import {Button, Collapse, Icon, Input} from "antd";
import * as PropTypes from "prop-types";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {startCase} from "lodash";
import JsonComponentList from "./JsonComponent";

const ListComponentProperties = ({pageDetails}) => {
    const dataStoreContext = useContext(DataStoreContext);
    const [openKeys, setOpenKeys] = useState([Object.keys(pageDetails)[0]]);

    const onChange = key => {
        console.log(key);
    };

    const selectedProjectItem = dataStoreContext.selectedProjectItem;

    //console.log("Data context is: ", selectedProjectItem.name);
    //console.log("Name is : ", selectedProjectItem.attributes.name)

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = e => {
        console.log(e);
        setVisible(false);
    };

    const handleCancel = e => {
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
                                       defaultValue={item.props[attr].value ? item.props[attr].value.value : attr}
                                />
                                <Button onClick={showModal}>
                                    <Icon type="edit"/>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Input
                                    style={{width: 190}}
                                    defaultValue={item.props[attr].value ? item.props[attr].value.value : attr}
                                />
                                <Button style={{border: "1px solid green"}}>
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
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                    />
                </Fragment>
            );
        });
    };
    if (!selectedProjectItem)
        return <p>Select an item to view the properties</p>;
    return (
        <Collapse
            defaultActiveKey={openKeys}
            onChange={onChange}
            style={{flex: "0 0 100%"}}
        >
            {generatePanelItem(selectedProjectItem)}
        </Collapse>
    );
};

ListComponentProperties.propTypes = {
    pageDetails: PropTypes.object
};

export default ListComponentProperties;
