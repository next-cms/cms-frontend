import React, {useContext, useEffect, useRef} from "react";
import * as PropTypes from "prop-types";

import getConfig from "next/config";
import {useRouter} from "next/router";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {message, Tabs} from "antd";
import {useQuery} from "graphql-hooks";
import dynamic from "next/dynamic";

const {TabPane} = Tabs;
const {publicRuntimeConfig} = getConfig();

const CodeEditor = dynamic(() => import("./CodeEditor"), {ssr: false});

export const pageSourceCode = `
  query pageSourceCode($projectId: String!, $page: String!) {
    pageSourceCode(id: $projectId, page: $page)
  }
`;

const {API_NEXT_PROJECT_URL} = publicRuntimeConfig;

const initStyle = {
    height: "100vh"
};

const PreviewPageComponents = ({pageDetails, pageName}) => {
    const ref = useRef();
    const router = useRouter();
    const projectId = router.query.id;
    const [style, setStyle] = React.useState(initStyle);
    const dataStoreContext = useContext(DataStoreContext);

    const {loading, error, data, refetch} = useQuery(pageSourceCode, {
        variables: {projectId: projectId, page: pageName}
    });

    useEffect(() => {
        if (error) {
            message.error("Error loading page data.");
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
        setStyle({visibility: "visible", background: "url(/static/loader.gif) center center no-repeat"});
    }, [pageName]);

    useEffect(() => {
        if (dataStoreContext.pageDetailsUpdated) {
            refetch({variables: {projectId: projectId, page: pageName}});
            ref.current.src = `${API_NEXT_PROJECT_URL}/${pageName}?projectId=${projectId}`;
            setStyle({visibility: "visible", background: "url(/static/loader.gif) center center no-repeat"});
        }
    }, [dataStoreContext.pageDetailsUpdated]);

    const onLoad = () => {
        setStyle(initStyle);
    };

    const onTabChange = (key) => {
        console.log(key);
    };

    const onCodeEditorChange = (newValue) => {
        console.log("change", newValue);
    };

    return (
        <Tabs onChange={onTabChange} type="card" style={{flex: "1 1 auto"}}>
            <TabPane tab="Source Code" key="1">
                <CodeEditor
                    mode="jsx"
                    onChange={onCodeEditorChange}
                    value={data ? data.pageSourceCode : ""}
                    height="100vh"
                    width="100%"
                />
            </TabPane>
            <TabPane tab="Preview" key="2">
                <iframe ref={ref} id="ifPageComponents" width="100%" height="100%" style={style} onLoad={onLoad}/>
            </TabPane>
        </Tabs>
    );
};

PreviewPageComponents.propTypes = {
    pageDetails: PropTypes.object,
    pageName: PropTypes.string,
};

export default PreviewPageComponents;
