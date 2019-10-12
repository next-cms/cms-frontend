import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import MediaGallery from "../../components/common/media_gallery/MediaGallery";
import RoutesInfo from "../../constants/RoutesInfo";

const GalleryPage = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.GalleryPage.slug]);
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

GalleryPage.propTypes = {
    project: PropTypes.object
};

export default withAuthSync(GalleryPage);
