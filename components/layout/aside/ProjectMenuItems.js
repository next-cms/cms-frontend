import React from "react";
import {Icon, message} from "antd";
import {executeAllPagesQuery, executeCreateNewPageQuery} from "../../../utils/graphQLClientHelper";
import {injectParams} from "../../../utils/helpers";
import RoutesInfo from "../../../constants/RoutesInfo";

export const getProjectMenuItems = (params, graphQLClient) => {
    const menuItems = {
        "settings": {
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
            lazySubmenu: true,
            subMenu: [{
                key: "create-new-page",
                title: "",
                icon: <Icon type="plus"/>,
                className: "create-new-page",
                subMenu: null,
                onClick: ({menuItems, setMenuItems}, targetMenuItem) => {
                    if (!graphQLClient) {
                        message.error("Unexpected Error!");
                        console.error("GraphQLClient is not initialized!");
                    }
                    executeCreateNewPageQuery(graphQLClient, params.query.projectId)
                        .then(data => {
                            console.log("createNewPage response: ", data);
                            const newMenuItem = {
                                ...menuItems["pages"],
                                subMenu: [...menuItems["pages"].subMenu, data.addPage],
                                lazySubmenu: false
                            };
                            const newNavs = Object.assign({}, menuItems, {pages: newMenuItem});
                            setMenuItems(newNavs);
                        })
                        .catch((errors) => {
                            console.error(errors);
                            message.error(errors[0].message);
                        });
                }
            }],
            graphQLClient: null,
            onClick: ({menuItems, setMenuItems}, targetMenuItem) => {
                targetMenuItem.onClick = null;
                if (!graphQLClient) {
                    message.error("Unexpected Error!");
                    console.error("GraphQLClient is not initialized!");
                }
                executeAllPagesQuery(graphQLClient, params.query.projectId)
                    .then(data => {
                        console.log("projectPages response: ", data);
                        const newMenuItem = {
                            ...targetMenuItem,
                            subMenu: data ? [...targetMenuItem.subMenu, ...data.allPages] : targetMenuItem.subMenu,
                            lazySubmenu: false
                        };
                        const newMenuItems = Object.assign({}, menuItems, {pages: newMenuItem});
                        setMenuItems(newMenuItems);
                    })
                    .catch((errors) => {
                        console.error(errors);
                        message.error(errors[0].message);
                    });
            }
        },
        datastore: {
            key: RoutesInfo.DataStore.slug,
            title: RoutesInfo.DataStore.title,
            icon: <Icon type="database"/>,
            path: RoutesInfo.DataStore.path,
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
