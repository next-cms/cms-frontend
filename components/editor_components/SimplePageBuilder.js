import React, { useContext, useEffect, useRef } from "react";
import * as PropTypes from "prop-types";

import getConfig from "next/config";
import { useRouter } from "next/router";
import { DataStoreContext } from "../../contexts/DataStoreContextProvider";
import { Button, Col, message, Row, Tabs } from "antd";
import { useMutation, useQuery } from "graphql-hooks";
import dynamic from "next/dynamic";
import { handleGraphQLAPIErrors } from "../../utils/helpers";
import { DELETE_PAGE, PAGE_SOURCE_CODE, SAVE_PAGE_SOURCE_CODE } from "../../utils/GraphQLConstants";
import { MenuContext } from "../../contexts/MenuContextProvider";
import { redirectTo } from "../common/Redirect";
import RoutesInfo from "../../constants/RoutesInfo";
import PageEditorComponent from "./PageEditorComponent";

const {TabPane} = Tabs;
const {publicRuntimeConfig} = getConfig();

const CodeEditor = dynamic(() => import("../common/CodeEditor"), {ssr: false});

const {API_NEXT_PROJECT_URL} = publicRuntimeConfig;

const initStyle = {
    height: "calc(100vh - 174px)"
};

const SimplePageBuilder = ({ pageDetails, pageName }) => {
    const ref = useRef();
    const [style, setStyle] = React.useState(initStyle);
    const [ tab, setTab ] = React.useState("1");
    const dataStoreContext = useContext(DataStoreContext);
    const menuContext = useContext(MenuContext);

    const router = useRouter();
    const projectId = router.query.projectId;

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
            hideMessage = message.loading("Loading page source code...", 0);
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
            background: "url(/images/loader.gif) center center no-repeat"
        });
    }, [pageName, tab]);

    useEffect(() => {
        if (dataStoreContext.pageDetailsUpdated) {
            refetch({variables: {projectId: projectId, page: pageName}});
            dataStoreContext.setPageDetailsUpdated(false);
            if (ref.current) {
                ref.current.src = `${API_NEXT_PROJECT_URL}/${pageName}?projectId=${projectId}`;
                setStyle({
                    ...initStyle,
                    visibility: "visible",
                    background: "url(/images/loader.gif) center center no-repeat"
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
                ...initStyle,
                visibility: "visible",
                background: "url(/images/loader.gif) center center no-repeat"
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
            dataStoreContext.setProjectPagesListUpdated(true);
            await redirectTo(`${RoutesInfo.ProjectPages.path}?projectId=${projectId}`);
            message.success(`Deleted page '${pageName}' successfully!`);
        } else {
            handleGraphQLAPIErrors(result.error);
        }
    };

    const deleteButton = <Button type="danger" onClick={onDeletePage}>Delete Page</Button>;
    return (
        <Tabs onChange={onTabChange} type="card" style={{flex: "1 1 auto"}} activeKey={tab}
              tabBarExtraContent={deleteButton}>
            <TabPane tab="Properties" key="1">
                <PageEditorComponent pageName={pageName} projectId={projectId}/>
            </TabPane>
            <TabPane tab="Source Code" key="2">
                <CodeEditor
                    onSave={onSaveCodeEditor}
                    mode="jsx"
                    onChange={onCodeEditorChange}
                    value={data ? data.pageSourceCode : ""}
                    height="calc(100vh - 174px)"
                    width="100%"
                />
            </TabPane>
            <TabPane tab="Preview" key="3">
                <iframe ref={ref} id="ifPageComponents" width="100%" height="100%" style={style} onLoad={onLoad}/>
                <Row>
                    <Col>
                        <Button type="primary" onClick={onRefreshClick}>Refresh/Reload</Button>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    );
};

SimplePageBuilder.propTypes = {
    pageDetails: PropTypes.object,
    pageName: PropTypes.string,
};

export default SimplePageBuilder;
