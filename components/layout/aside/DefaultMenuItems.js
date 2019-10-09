import React from "react";
import {Icon} from "antd";
import getConfig from "next/config";
import WrappedAvailableComponents from "../../../pages/available-components";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH, ABOUT_PATH, AVAILABLE_COMPONENTS_PATH} = publicRuntimeConfig;

const DefaultMenuItems = {
    dashboard: {
        key: "dashboard",
        title: "Dashboard",
        path: DASHBOARD_PATH,
        icon: <Icon type="pie-chart"/>,
        subMenu: null
    },
    availableComponents: {
        key: WrappedAvailableComponents.routeInfo.slug,
        title: WrappedAvailableComponents.routeInfo.title,
        path: WrappedAvailableComponents.routeInfo.path,
        icon: <Icon type="block"/>,
        subMenu: null
    },
    about: {
        key: "about",
        title: "About",
        path: ABOUT_PATH,
        icon: <Icon type="user"/>,
        subMenu: null
    }
};

export default DefaultMenuItems;
