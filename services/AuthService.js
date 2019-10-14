import getConfig from "next/config";
import BaseService from "./BaseService";

const {publicRuntimeConfig} = getConfig();
const {API_LOGIN_URL, RESOLVE_USER_URL} = publicRuntimeConfig;


export default class AuthService {
    static login = (credential, onSuccess, onFailed) => {
        console.log("AuthService login");
        return BaseService.post(API_LOGIN_URL, credential, onSuccess, onFailed);
    };

    static resolveUser = (token, onSuccess, onFailed) => {
        return BaseService.get(RESOLVE_USER_URL, onSuccess, onFailed, {headers: {Authorization: `Bearer ${token}`}});
    };
}
