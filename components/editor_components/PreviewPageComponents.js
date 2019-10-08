import React, {useContext, useEffect, useRef} from "react";
import * as PropTypes from "prop-types";

import getConfig from "next/config";
import {useRouter} from "next/router";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {Button, Col, message, Row, Tabs} from "antd";
import {useMutation, useQuery} from "graphql-hooks";
import dynamic from "next/dynamic";
import {handleGraphQLAPIErrors} from "../../utils/helpers";
import {DELETE_PAGE, PAGE_SOURCE_CODE, SAVE_PAGE_SOURCE_CODE} from "../../utils/GraphQLConstants";
import {MenuContext} from "../../contexts/MenuContextProvider";
import {redirectTo} from "../common/Redirect";

const {TabPane} = Tabs;
const {publicRuntimeConfig} = getConfig();

const CodeEditor = dynamic(() => import("../common/CodeEditor"), {ssr: false});

const {API_NEXT_PROJECT_URL, PROJECT_SETTINGS_PATH} = publicRuntimeConfig;

const initStyle = {
    height: "calc(100vh - 180px)"
};

const PreviewPageComponents = ({pageDetails, pageName}) => {
    const ref = useRef();
    const [style, setStyle] = React.useState(initStyle);
    const [tab, setTab] = React.useState("2");
    const dataStoreContext = useContext(DataStoreContext);
    const menuContext = useContext(MenuContext);

    const router = useRouter();
    const projectId = router.query.id;

    const [savePageSourceCode] = useMutation(SAVE_PAGE_SOURCE_CODE);
    const [deletePage] = useMutation(DELETE_PAGE);
    const {loading, error, data, refetch} = useQuery(PAGE_SOURCE_CODE, {
        variables: {projectId: projectId, page: pageName}
    });

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        let hideMessage;
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading page data...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.src = `${API_NEXT_PROJECT_URL}/${pageName}?projectId=${projectId}`;
        setStyle({
            ...initStyle,
            visibility: "visible",
            background: "url(/static/loader.gif) center center no-repeat"
        });
    }, [pageName, tab]);

    useEffect(() => {
        if (dataStoreContext.pageDetailsUpdated) {
            refetch({variables: {projectId: projectId, page: pageName}});
            if (ref.current) {
                ref.current.src = `${API_NEXT_PROJECT_URL}/${pageName}?projectId=${projectId}`;
                setStyle({
                    height: "100vh",
                    visibility: "visible",
                    background: "url(/static/loader.gif) center center no-repeat"
                });
            }
        }
    }, [dataStoreContext.pageDetailsUpdated]);

    const onLoad = () => {
        setStyle(initStyle);
    };

    const onRefreshClick = () => {
        if (ref.current) {
            ref.current.src = `${API_NEXT_PROJECT_URL}/${pageName}?projectId=${projectId}`;
            setStyle({
                height: "100vh",
                visibility: "visible",
                background: "url(/static/loader.gif) center center no-repeat"
            });
        }
    };

    const onTabChange = (key) => {
        console.log(key);
        setTab(key);
    };

    const onCodeEditorChange = (newValue) => {
        console.log("change");
    };

    const onSaveCodeEditor = async (code) => {
        const result = await savePageSourceCode({
            variables: {
                sourceCode: code,
                projectId: projectId,
                page: pageName
            }
        });
        if (!result.error) {
            dataStoreContext.setPageDetailsUpdated(true);
        } else {
            handleGraphQLAPIErrors(result.error);
        }
    };

    const onDeletePage = async () => {
        const result = await deletePage({
            variables: {
                projectId: projectId,
                page: pageName
            }
        });
        if (!result.error) {
            menuContext.deleteFromPageMenu(menuContext.selectedKeys && menuContext.selectedKeys[0]);
            await redirectTo(`${PROJECT_SETTINGS_PATH}?id=${projectId}`);
            message.success(`Deleted page '${pageName}' successfully!`);
        } else {
            handleGraphQLAPIErrors(result.error);
        }
    };

    const deleteButton = <Button type="danger" onClick={onDeletePage}>Delete Page</Button>;
    return (
        <Tabs onChange={onTabChange} type="card" style={{flex: "1 1 auto"}} activeKey={tab}
              tabBarExtraContent={deleteButton}>
            <TabPane tab="Preview" key="1">
                <iframe ref={ref} id="ifPageComponents" width="100%" height="100%" style={style} onLoad={onLoad}/>
                <Row>
                    <Col>
                        <Button type="primary" onClick={onRefreshClick}>Refresh/Reload</Button>
                    </Col>
                </Row>
            </TabPane>
            <TabPane tab="Source Code" key="2">
                <CodeEditor
                    onSave={onSaveCodeEditor}
                    mode="jsx"
                    onChange={onCodeEditorChange}
                    value={data ? data.pageSourceCode : ""}
                    height="calc(100vh - 180px)"
                    width="100%"
                />
            </TabPane>
        </Tabs>
    );
};

PreviewPageComponents.propTypes = {
    pageDetails: PropTypes.object,
    pageName: PropTypes.string,
};

export default PreviewPageComponents;
