import "brace";
import "brace/mode/javascript";
import "brace/mode/jsx";
import "brace/mode/json";
import "brace/theme/github";
import AceEditor from "react-ace";
import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Col, Row} from "antd";
import {useMutation} from "graphql-hooks";
import {handleGraphQLAPIErrors} from "../../utils/helpers";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {useRouter} from "next/router";

export const SAVE_PAGE_SOURCE_CODE = `
  mutation pageSourceCode($sourceCode: String!, $projectId: String!, $page: String!) {
    pageSourceCode(sourceCode: $sourceCode, projectId: $projectId, page: $page)
  }
`;

const CodeEditor = (props) => {
    const [readOnly, setReadOnly] = useState(true);
    const [value, setValue] = useState(props.value);
    const [savePageSourceCode] = useMutation(SAVE_PAGE_SOURCE_CODE);
    const dataStoreContext = useContext(DataStoreContext);

    const router = useRouter();
    const projectId = router.query.id;
    const pageName = router.query.pageName;

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onButtonClick = async () => {
        if (!readOnly) {
            const result = await savePageSourceCode({
                variables: {
                    sourceCode: value,
                    projectId: projectId,
                    page: pageName
                }
            });
            if (!result.error) {
                dataStoreContext.setPageDetailsUpdated(true);
            } else {
                handleGraphQLAPIErrors(result);
            }
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
                name="sourceCodeEditor"
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
                    <Button type="primary" onClick={onButtonClick}
                            style={{width: "100px"}}>{readOnly ? "Edit" : "Save"}</Button>
                    <Button type="secondary" onClick={onCancelClick} hidden={readOnly}
                            style={{width: "100px", marginLeft: "5px"}}>Cancel</Button>
                </Col>
            </Row>
        </Fragment>
    );
};

export default CodeEditor;
