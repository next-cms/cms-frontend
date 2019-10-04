import React from "react";
import * as PropTypes from "prop-types";
import DefaultMenuItems from "./aside/DefaultMenuItems";
import {MenuContext} from "../../contexts/MenuContextProvider";
import CommonLayout from "./CommonLayout";
import NavHeader from "./header/DefaultNavHeader";
import CustomFooter from "./Footer";

const DefaultLayout = ({navHeader, children}) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setMenuItems(DefaultMenuItems);
        menuContext.setSelectedKeys([DefaultMenuItems.dashboard.key]);
    }, []);

    return (
        <CommonLayout navHeader={<NavHeader/>} footer={<CustomFooter/>}>
            {children}
        </CommonLayout>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
    navHeader: PropTypes.element
};

export default DefaultLayout;
