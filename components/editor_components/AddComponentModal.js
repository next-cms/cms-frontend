import React, {useState} from "react";
import * as PropTypes from "prop-types";
import AvailableComponentPicker from "./AvailableComponentPicker";
import ModalComponent from "../common/ModalComponent";

const AddComponentModal = ({visible, handleOk, handleCancel}) => {
    const [selectedComponents, setSelectedComponents] = useState([]);

    const onSelect = (_selectedComponents) => {
        console.log(_selectedComponents);
        setSelectedComponents(_selectedComponents);
    };

    const _handleOk = (e) => {
        console.log(e);
        handleOk(selectedComponents);
        setSelectedComponents([]);
    };

    return (
        <ModalComponent
            title="Component Lists"
            visible={visible}
            handleOk={_handleOk}
            onCancel={handleCancel}
        >
            <AvailableComponentPicker onSelect={onSelect} selectedComponents={selectedComponents}/>
        </ModalComponent>
    );
};

AddComponentModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func
};

export default AddComponentModal;
