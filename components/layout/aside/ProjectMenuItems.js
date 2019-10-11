import React from "react";
import {Icon, message} from "antd";
import {executeAllPagesQuery, executeCreateNewPageQuery} from "../../../utils/graphQLClientHelper";
import {injectParams} from "../../../utils/helpers";
import {Settings} from "../../../pages/project/settings";
import {Pages} from "../../../pages/project/pages";
import {GallaryPage} from "../../../pages/project/gallery";
import {DataStore} from "../../../pages/project/datastore";
import {AvailableComponents} from "../../../pages/project/available-components";

export const getProjectMenuItems = (params, graphQLClient) => {
    const menuItems = {
        "settings": {
            key: "settings",
            title: "Project Setting",
            icon: <Icon type="setting"/>,
            path: Settings.routeInfo.path,
            subMenu: null
        },
        pages: {
            key: "pages",
            title: "Pages",
            icon: <Icon type="snippets"/>,
            path: Pages.routeInfo.path,
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
                    executeCreateNewPageQuery(graphQLClient, params.query.id)
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
                executeAllPagesQuery(graphQLClient, params.query.id)
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
        header: {
            key: DataStore.routeInfo.slug,
            title: DataStore.routeInfo.title,
            icon: <Icon type="database"/>,
            path: DataStore.routeInfo.path,
            subMenu: null
        },
        footer: {
            key: GallaryPage.routeInfo.slug,
            title: GallaryPage.routeInfo.title,
            icon: <Icon type="picture"/>,
            path: GallaryPage.routeInfo.path,
            subMenu: null
        },
        availableComponents: {
            key: AvailableComponents.routeInfo.slug,
            title: AvailableComponents.routeInfo.title,
            path: AvailableComponents.routeInfo.path,
            icon: <Icon type="block"/>,
            subMenu: null
        }
    };
    injectParams(menuItems, params);
    return menuItems;
};
