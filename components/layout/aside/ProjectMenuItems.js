import React from "react";
import { Icon } from "antd";
import { injectParams } from "../../../utils/helpers";
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
        layouts: {
            key: RoutesInfo.ProjectLayouts.slug,
            title: RoutesInfo.ProjectLayouts.title,
            icon: <Icon type="snippets"/>,
            path: RoutesInfo.ProjectLayouts.path,
            subMenu: null
        },
        pages: {
            key: RoutesInfo.ProjectPages.slug,
            title: RoutesInfo.ProjectPages.title,
            icon: <Icon type="snippets"/>,
            path: RoutesInfo.ProjectPages.path,
            subMenu: null
        },
        menus: {
            key: RoutesInfo.ProjectMenus.slug,
            title: RoutesInfo.ProjectMenus.title,
            icon: <Icon type="snippets"/>,
            path: RoutesInfo.ProjectMenus.path,
            subMenu: null
        },
        headers: {
            key: RoutesInfo.ProjectHeaders.slug,
            title: RoutesInfo.ProjectHeaders.title,
            icon: <Icon type="snippets"/>,
            path: RoutesInfo.ProjectHeaders.path,
            subMenu: null
        },
        footers: {
            key: RoutesInfo.ProjectFooters.slug,
            title: RoutesInfo.ProjectFooters.title,
            icon: <Icon type="snippets"/>,
            path: RoutesInfo.ProjectFooters.path,
            subMenu: null
        },
        posts: {
            key: RoutesInfo.ProjectPosts.slug,
            title: RoutesInfo.ProjectPosts.title,
            icon: <Icon type="database"/>,
            path: RoutesInfo.ProjectPosts.path,
            subMenu: null
        },
        forms: {
            key: RoutesInfo.ProjectForms.slug,
            title: RoutesInfo.ProjectForms.title,
            icon: <Icon type="database"/>,
            path: RoutesInfo.ProjectForms.path,
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
