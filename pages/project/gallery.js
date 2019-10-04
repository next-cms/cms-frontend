import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import getConfig from "next/config";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectMediaGallery from "../../components/editor_components/ProjectMediaGallery";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

const MediaGallery = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([WrappedMediaGallery.routeInfo.slug]);
        menuContext.setOpenedKeys([]);
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <ProjectMediaGallery project={props.project}/>
        </PageWrapper>
    );
};

MediaGallery.propTypes = {
    project: PropTypes.object
};

const WrappedMediaGallery = withAuthSync(MediaGallery);

WrappedMediaGallery.routeInfo = {
    slug: "gallery",
    path: "/project/gallery",
    pathAs: "/project/gallery",
    title: "Media Gallery"
};

export default WrappedMediaGallery;
