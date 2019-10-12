import React, {Component} from "react";
import * as PropTypes from "prop-types";

/* First we will make a new context */
export const UserContext = React.createContext();

/* User State */
const initUserState = {
    loading: false,
    users: [
        {id: 1, firstName: "Md", lastName: "Shamim"}, {id: 2, firstName: "Md", lastName: "Mehedi"}
    ]
};

/* Then create a provider Component */
class UserContextProvider extends Component {
    state = initUserState;

    /* User Actions */
    addUser = async (user) => {
        this.setState({
            users: this.state.users.concat(user)
        });
    };

    render() {
        return (
            <UserContext.Provider
                value={{
                    loading: this.state.loading,
                    users: this.state.users,
                    addUser: this.addUser,
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

UserContextProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default UserContextProvider;
