import React from "react";
import { Modal } from "antd";
import * as PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const ModalComponent = ({ title, okText, visible, handleOk, handleCancel, children }) => {

    const _handleOk = (e) => {
        handleOk(e);
    };

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={_handleOk}
            okText={okText}
            onCancel={handleCancel}
        >
            {children}
        </Modal>
    );
};

ModalComponent.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func
};

export default ModalComponent;
