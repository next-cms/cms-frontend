/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Menu, Icon } from "antd";
import Link from "next/link";


const { SubMenu } = Menu;

const InlineNav = ({ menu }) => {

    const [current, setCurrent] = useState("");
    const handleClick = e => {
        setCurrent(e.key);
    };

    const getMenuItem = (item) => {
        return item.subMenu ? bindSubMenuItem(item) : bindSingleMenuItem(item);
    };

    const bindSingleMenuItem = (item) => {
        return (
            <Menu.Item
                key={item.key}
                onClick={() => {
                    console.log("clicked: ", item);
                }}
            >
                {item.title}
                {item.path && <Link href={item.path} as={item.pathAs}><a /></Link>}
            </Menu.Item>);
    };

    const bindSubMenuItem = (item) => {
        return (
            <SubMenu
                onTitleClick={() => {
                    console.log("clicked", item);
                }}
                key={item.subMenu.key}
                title={item.title}
            >
                {item.subMenu.map(item => getMenuItem(item))}
            </SubMenu>
        );
    };
    return (
        <div>
            <Menu
                mode="horizontal"
                onClick={handleClick}
                selectedKeys={[current]}
            >
                {Object.values(menu).map(item => getMenuItem(item))}
            </Menu>
        </div>
    );
};
export default InlineNav;
