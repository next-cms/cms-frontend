import React from "react";
import {Icon} from "antd";
import {injectParams} from "../../../utils/helpers";
import RoutesInfo from "../../../constants/RoutesInfo";

export const getProjectMenuItems = (params) => {
    const menuItems = {
        settings: {
            key: RoutesInfo.ProjectSettings.slug,
            title: RoutesInfo.ProjectSettings.title,
            icon: <Icon type="setting"/>,
            path: RoutesInfo.ProjectSettings.path,
            subMenu: null
        },
        pages: {
            key: RoutesInfo.ProjectPages.slug,
            title: RoutesInfo.ProjectPages.title,
            icon: <Icon type="snippets"/>,
            path: RoutesInfo.ProjectPages.path,
            subMenu: null
        },
        posts: {
            key: RoutesInfo.Posts.slug,
            title: RoutesInfo.Posts.title,
            icon: <Icon type="database"/>,
            path: RoutesInfo.Posts.path,
            subMenu: null
        },
        gallery: {
            key: RoutesInfo.GalleryPage.slug,
            title: RoutesInfo.GalleryPage.title,
            icon: <Icon type="picture"/>,
            path: RoutesInfo.GalleryPage.path,
            subMenu: null
        },
        availableComponents: {
            key: RoutesInfo.ProjectAvailableComponents.slug,
            title: RoutesInfo.ProjectAvailableComponents.title,
            path: RoutesInfo.ProjectAvailableComponents.path,
            icon: <Icon type="block"/>,
            subMenu: null
        }
    };
    injectParams(menuItems, params);
    return menuItems;
};
