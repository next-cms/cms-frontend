import React, { Fragment } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import { withAuthSync } from "../../utils/withAuthSync";
import { MenuContext } from "../../contexts/MenuContextProvider";
import MediaGallery from "../../components/common/media_gallery/MediaGallery";
import RoutesInfo from "../../constants/RoutesInfo";
import { useRouter } from "next/router";
import EditorNavHeader from "../../components/layout/header/EditorNavHeader";
import { Affix } from "antd";

const GalleryPage = (props) => {
    const menuContext = React.useContext(MenuContext);
    const router = useRouter();

    React.useEffect(() => {
        menuContext.setSelectedKeys([RoutesInfo.GalleryPage.slug]);
        menuContext.setOpenedKeys([]);
    }, []);

    if (!router.query.projectId) return null;

    return (
        <Fragment>
            <Affix>
                <div>
                    <EditorNavHeader/>
                </div>
            </Affix>
            <PageWrapper style={{
                display: "flex",
                flex: "0 0 100%",
                minHeight: "calc(100vh - 80px)",
                padding: 0
            }}>
                <MediaGallery projectId={router.query.projectId}/>
            </PageWrapper>
        </Fragment>
    );
};

export default withAuthSync(GalleryPage);
