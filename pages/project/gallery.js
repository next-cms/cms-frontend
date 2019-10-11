import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import getConfig from "next/config";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import MediaGallery from "../../components/common/media_gallery/MediaGallery";


const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

export const GallaryPage = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([GallaryPage.routeInfo.slug]);
        menuContext.setOpenedKeys([]);
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <MediaGallery project={props.project}/>
        </PageWrapper>
    );
};

GallaryPage.propTypes = {
    project: PropTypes.object
};

GallaryPage.routeInfo = {
    slug: "gallery",
    path: "/project/gallery",
    pathAs: "/project/gallery",
    title: "Media Gallery"
};

export default withAuthSync(GallaryPage);
