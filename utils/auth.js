import {redirectTo} from "../components/common/Redirect";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import AuthService from "../services/AuthService";
import RoutesInfo from "../constants/RoutesInfo";

export const auth = async ctx => {
    const {token, user} = nextCookie(ctx);

    if (!token) {
        return redirectTo(RoutesInfo.Login.path, {res: ctx.res, status: 301});
    }

    const onSuccess = resp => {
        // console.log("auth", resp);
        //if auth check was successful, send to dashboard
        console.log(resp);
        return resp;
    };

    const onFailed = (err) => {
        // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // redirectTo(LOGIN_PATH, { res: ctx.res, status: 302 });
        console.error(err);
        cookie.remove("token");
        return redirectTo(RoutesInfo.Login.path, {res: ctx.res, status: 301});
    };

    const response = await AuthService.resolveUser(token, onSuccess, onFailed);

    return response ? {user, token} : null;
};

/**
 * Usage
 * import { withAuthSync } from '../utils/auth'
 *
 * const Profile = props =>
 * <div>If you can see this, you are logged in.</div>
 *
 * export default withAuthSync(Profile)
 */
