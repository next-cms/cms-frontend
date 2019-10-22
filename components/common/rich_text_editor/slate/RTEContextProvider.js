import React, {Component} from "react";
import * as PropTypes from "prop-types";
import initialValue from "./value.json";
import {Value} from "slate";

/* First we will make a new context */
export const RTEContext = React.createContext();

/* Then create a provider Component */
class RTEContextProvider extends Component {
    /* State */
    constructor(props) {
        super(props);
        this.state = {
            value: Value.fromJSON(props.value || initialValue),
            title: props.title,
            modalVisible: false,
            modalResolve: () => {
            },
            modalReject: () => {
            },
            gallerySelectedItem: null,
            editor: null
        };
    }

    /* Actions */
    showModal = () => {
        this.setState({
            modalVisible: true
        });
        return new Promise((resolve, reject) => {
            this.setState({
                modalResolve: resolve,
                modalReject: reject
            });
        });
    };

    hideModal = () => {
        this.setState({
            modalVisible: false
        });
    };

    setGallerySelectedItem = (gallerySelectedItem) => {
        this.setState({gallerySelectedItem});
    };

    setEditorInstance = (editor) => {
        this.setState({editor});
    };

    setEditorValue = (value) => {
        this.setState({value});
    };

    render() {
        return (
            <RTEContext.Provider
                value={{
                    value: this.state.value,
                    editor: this.state.editor,
                    modalVisible: this.state.modalVisible,
                    gallerySelectedItem: this.state.gallerySelectedItem,
                    modalResolve: this.state.modalResolve,
                    modalReject: this.state.modalReject,
                    setEditorValue: this.setEditorValue,
                    showModal: this.showModal,
                    hideModal: this.hideModal,
                    setEditorInstance: this.setEditorInstance,
                    setGallerySelectedItem: this.setGallerySelectedItem,
                }}
            >
                {this.props.children}
            </RTEContext.Provider>
        );
    }
}

RTEContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default RTEContextProvider;
