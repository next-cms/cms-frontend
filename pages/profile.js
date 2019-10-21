import React, {Fragment} from "react";
import Profile from "../components/layout/header/Profile";
import {Affix} from "antd";
import DefaultNavHeader from "../components/layout/header/DefaultNavHeader";

export const ProfileDetails = () => {
    return (
        <Fragment>
            <Affix>
                <div>
                    <DefaultNavHeader/>
                </div>
            </Affix>
            <Profile/>
        </Fragment>
    );
};

export default ProfileDetails;
