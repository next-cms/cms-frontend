import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectPages from "../../components/editor_components/ProjectPages";
import {useRouter} from "next/router";
import RoutesInfo from "../../constants/RoutesInfo";

const Pages = (props) => {
    const menuContext = React.useContext(MenuContext);
    const router = useRouter();

    React.useEffect(() => {
        menuContext.setOpenedKeys([RoutesInfo.ProjectPages.slug]);
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

export default withAuthSync(Pages);
