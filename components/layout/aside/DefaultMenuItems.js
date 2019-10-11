import React from "react";
import {Icon} from "antd";
import getConfig from "next/config";
import {AvailableComponents} from "../../../pages/available-components";

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
        key: AvailableComponents.routeInfo.slug,
        title: AvailableComponents.routeInfo.title,
        path: AvailableComponents.routeInfo.path,
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
