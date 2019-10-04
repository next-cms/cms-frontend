import {message} from "antd";
import {redirectTo} from "../components/common/Redirect";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
const {LOGIN_PATH} = publicRuntimeConfig;

export function concatQueryParamsToPath(path, params) {
    let modifiedPath = path;
    let f = false;
    for (const paramKey in params) {
        if (params.hasOwnProperty(paramKey) && typeof params[paramKey] != "undefined") {
            if (f) modifiedPath += "&";
            else modifiedPath += "?";
            modifiedPath += `${paramKey}=${params[paramKey]}`;
            f = true;
        }
    }
    return modifiedPath;
}

export function concatPathParamsToPath(path, params) {
    let modifiedPath = path;
    for (const param of Object.values(params)) {
        if (typeof param != "undefined") {
            modifiedPath += `/${param}`;
        }
    }
    return modifiedPath;
}

export function injectParamsToPathOfNav(nav, params) {
    nav.queryParam = params.query;
    nav.pathAs = concatQueryParamsToPath(concatPathParamsToPath(nav.path, {pathParam: nav.pathParam}), params.query);
    nav.path = concatQueryParamsToPath(nav.path, {...params.query, component: nav.pathParam});
}

export function injectParamsToPathOfNavs(navs, params) {
    for (const nav of navs) {
        injectParamsToPathOfNav(nav, params);
    }
}

export function injectParams(navs, params) {
    for (const nav of Object.values(navs)) {
        injectParamsToPathOfNav(nav, params);
    }
}

export function handleGraphQLAPIErrors(error) {
    message.error(
        (error.httpError && error.httpError.statusText) ||
        (error.graphQLErrors && error.graphQLErrors[0].message)
    );
    console.error(error);
    if (error.graphQLErrors && error.graphQLErrors[0].extensions.code === "FORBIDDEN") {
        return redirectTo(LOGIN_PATH);
    }
}
