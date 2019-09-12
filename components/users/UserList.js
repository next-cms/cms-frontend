import React, {useContext} from "react";
import {Table} from "antd";
import {UserContext} from "../../contexts/UserContextProvider";

const UserList = () => {

    const userContext = useContext(UserContext);

    const userColumns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            // render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        }
    ];

    return (
      <Table columns={userColumns} dataSource={userContext.users} rowKey="id" />
    );
};

export default UserList;
