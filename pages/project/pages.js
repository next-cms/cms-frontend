import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import getConfig from "next/config";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectPages from "../../components/editor_components/ProjectPages";
import {useRouter} from "next/router";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

export const Pages = (props) => {
    const menuContext = React.useContext(MenuContext);
    const router = useRouter();

    React.useEffect(() => {
        menuContext.setOpenedKeys([Pages.routeInfo.slug]);
        if (router.query.pageName) {
            menuContext.setSelectedKeys([router.query.pageName]);
        }
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <ProjectPages/>
        </PageWrapper>
    );
};

Pages.propTypes = {};

Pages.routeInfo = {
    slug: "pages",
    path: "/project/pages",
    pathAs: "/project/pages"
};

export default withAuthSync(Pages);
