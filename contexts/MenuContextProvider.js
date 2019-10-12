import React, {Component} from "react";
import * as PropTypes from "prop-types";
import DefaultMenuItems from "../components/layout/aside/DefaultMenuItems";

/* First we will make a new context */
export const MenuContext = React.createContext();

const initMenuState = {
    menuItems: DefaultMenuItems,
    selectedKeys: [DefaultMenuItems.dashboard.key],
    openedKeys: []
};

/* Then create a provider Component */
class MenuContextProvider extends Component {
    state = initMenuState;

    setMenuItems = (menuItems) => {
        this.setState({menuItems});
    };

    setSelectedKeys = (selectedKeys) => {
        this.setState({selectedKeys});
    };

    setOpenedKeys = (openedKeys) => {
        this.setState({openedKeys});
    };

    deleteFromPageMenu = (pageKey) => {
        if (pageKey) {
            this.setState({
                menuItems: {
                    ...this.state.menuItems,
                    pages: {
                        ...this.state.menuItems.pages,
                        subMenu: this.state.menuItems["pages"].subMenu.filter((item) => item.key !== pageKey)
                    }
                }
            });
        }
    };

    updateInPageMenu = (pageKey, modifiedPage) => {
        if (pageKey) {
            this.setState({
                menuItems: {
                    ...this.state.menuItems,
                    pages: {
                        ...this.state.menuItems.pages,
                        subMenu: this.state.menuItems["pages"].subMenu.map((item) => {
                            if (item.key === pageKey) {
                                return modifiedPage;
                            } else {
                                return item;
                            }
                        })
                    }
                }
            });
        }
    };

    render() {
        return (
            <MenuContext.Provider
                value={{
                    menuItems: this.state.menuItems,
                    selectedKeys: this.state.selectedKeys,
                    openedKeys: this.state.openedKeys,
                    setMenuItems: this.setMenuItems,
                    deleteFromPageMenu: this.deleteFromPageMenu,
                    updateInPageMenu: this.updateInPageMenu,
                    setSelectedKeys: this.setSelectedKeys,
                    setOpenedKeys: this.setOpenedKeys,
                }}
            >
                {this.props.children}
            </MenuContext.Provider>
        );
    }
}

MenuContextProvider.propTypes = {
    children: PropTypes.element,
};

export default MenuContextProvider;
