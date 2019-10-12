import React from "react";
import {withAuthSync} from "../../utils/withAuthSync";
import {redirectTo} from "../../components/common/Redirect";
import {useRouter} from "next/router";
import RoutesInfo from "../../constants/RoutesInfo";

const Project = (props) => {
    const router = useRouter();
    console.log(router);
    return {};
};

Project.getInitialProps = async (ctx) => {
    return await redirectTo(`${RoutesInfo.ProjectSettings.path}?projectId=${ctx.query.projectId}`, ctx);
};

export default withAuthSync(Project);
