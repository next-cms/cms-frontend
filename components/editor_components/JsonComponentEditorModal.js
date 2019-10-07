import React from "react";
import {Collapse, Icon, Modal, Select} from "antd";
import * as PropTypes from "prop-types";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("./../common/CodeEditor"), {ssr: false});

const { Panel } = Collapse;
const { Option } = Select;

const JsonComponentEditorModal = ({visible, handleOk, handleCancel}) => {
    const onCodeEditorChange = (newValue) => {
        console.log("change");
    };

    const onSaveCodeEditor = async (code) => {
        console.log("save", code);
    };

    return (
        <div>
            <Modal
                title="Component Lists"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Collapse
                    accordion
                    expandIcon={({ isActive }) => (
                        <Icon type="caret-right" rotate={isActive ? 270 : 90} />
                    )}
                >
                    <Panel header="Json Data" key="1">
                        <CodeEditor
                            onSave={onSaveCodeEditor}
                            name="jsonEditor"
                            mode="json"
                            onChange={onCodeEditorChange}
                            value={""}
                            height="300px"
                            width="440px"
                        />
                    </Panel>
                </Collapse>

                <Select defaultValue="Model" style={{width: "472px"}}>
                    <Option value="Option 1">Option 1</Option>
                    <Option value="Option 2">Option 2</Option>
                    <Option value="Option 3">Option 3</Option>
                </Select>
            </Modal>
        </div>
    );
};

JsonComponentEditorModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func
};

export default JsonComponentEditorModal;
