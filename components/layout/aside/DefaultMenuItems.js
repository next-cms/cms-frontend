import React from "react";
import {Icon} from "antd";
import RoutesInfo from "../../../constants/RoutesInfo";

const DefaultMenuItems = {
    dashboard: {
        key: RoutesInfo.Dashboard.slug,
        title: RoutesInfo.Dashboard.title,
        path: RoutesInfo.Dashboard.path,
        icon: <Icon type="pie-chart"/>,
        subMenu: null
    },
    availableComponents: {
        key: RoutesInfo.AvailableComponents.slug,
        title: RoutesInfo.AvailableComponents.title,
        path: RoutesInfo.AvailableComponents.path,
        icon: <Icon type="block"/>,
        subMenu: null
    },
    about: {
        key: RoutesInfo.About.slug,
        title: RoutesInfo.About.title,
        path: RoutesInfo.About.path,
        icon: <Icon type="user"/>,
        subMenu: null
    }
};

export default DefaultMenuItems;
