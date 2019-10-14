import React from "react";
import {withAuthSync} from "../utils/withAuthSync";
import {MetaRedirect} from "../components/common/Redirect";
import RoutesInfo from "../constants/RoutesInfo";

const Home = () => <MetaRedirect to={RoutesInfo.Dashboard.path}/>;

// Home.getInitialProps = async (ctx) => {
//     return redirectTo(DASHBOARD_PATH, ctx);
// };

export default withAuthSync(Home);
