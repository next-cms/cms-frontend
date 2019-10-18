import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import MediaGallery from "../../components/common/media_gallery/MediaGallery";
import RoutesInfo from "../../constants/RoutesInfo";
import {useRouter} from "next/router";

const GalleryPage = (props) => {
    const menuContext = React.useContext(MenuContext);
    const router = useRouter();

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.GalleryPage.slug]);
        menuContext.setOpenedKeys([]);
    }, []);

    if (!router.query.projectId) return null;

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <MediaGallery projectId={router.query.projectId}/>
        </PageWrapper>
    );
};

GalleryPage.propTypes = {
    project: PropTypes.object
};

export default withAuthSync(GalleryPage);
