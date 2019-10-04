import "brace";
import "brace/mode/jsx";
import "brace/mode/json";
import "brace/theme/github";
import AceEditor from "react-ace";
import React, {Fragment, useEffect, useState} from "react";
import {Button, Col, Row} from "antd";

const CodeEditor = (props) => {
    const [readOnly, setReadOnly] = useState(true);
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onSaveClick = async () => {
        if (!readOnly) {
            props.onSave && props.onSave(value);
        }
        setReadOnly(!readOnly);
    };

    const onCancelClick = () => {
        setValue(props.value);
        setReadOnly(!readOnly);
    };

    const onChange = (newCode) => {
        setValue(newCode);
        if (props.onChange) {
            props.onChange(newCode);
        }
    };

    return (
        <Fragment>
            <AceEditor
                mode={props.mode}
                theme="github"
                onChange={onChange}
                name={props.name || "sourceCodeEditor"}
                editorProps={{
                    $blockScrolling: Infinity
                }}
                value={value || ""}
                height={props.height}
                width={props.width}
                readOnly={readOnly}
                style={{border: "1px solid lightgrey"}}
            />
            <Row style={{paddingTop: "5px"}}>
                <Col>
                    <Button type="primary" onClick={onSaveClick}
                            style={{width: "100px"}}>{readOnly ? "Edit" : "Save"}</Button>
                    <Button type="secondary" onClick={onCancelClick} hidden={readOnly}
                            style={{width: "100px", marginLeft: "5px"}}>Cancel</Button>
                </Col>
            </Row>
        </Fragment>
    );
};

export default CodeEditor;
