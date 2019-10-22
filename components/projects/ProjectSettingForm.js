import {AutoComplete, Button, Form, Input, message,} from "antd";
import React, {useContext, useEffect, useState} from "react";
// SCSS
import "./ProjectForm.scss";

import {useMutation} from "graphql-hooks";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import * as PropTypes from "prop-types";
import {UPDATE_PROJECT} from "../../utils/GraphQLConstants";
import {AuthContext} from "../../contexts/AuthContextProvider";

const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;

const ProjectSettingForm = (props) => {

    const [updateProject, project] = useMutation(UPDATE_PROJECT);
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const dataStoreContext = useContext(DataStoreContext);
    const authContext = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();

        props.form.validateFieldsAndScroll(async (err, values) => {

            if (!err) {
                const result = await updateProject({
                    variables: {
                        project: {
                            id: currentProject.id,
                            ownerId: authContext.user.id,
                            ...dataStoreContext.project,
                            ...values
                        }
                    }
                });

                if (!result.error) {
                    dataStoreContext.setProjectUpdated(true);
                } else {
                    message.error((result.httpError && result.httpError.statusText) ||
                        (result.graphQLErrors && result.graphQLErrors[0].message));
                }
            } else {
                console.error(err);
                message.error("Unexpected error!");
            }

        });
    };

    const handleWebsiteUrlChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = [".com", ".org", ".net"].map(domain => `${value}${domain}`);
        }
        setAutoCompleteResult(autoCompleteResult);
    };

    const {getFieldDecorator, setFieldsValue} = props.form;

    const websiteUrlOptions = autoCompleteResult.map(websiteUrl => (
        <AutoCompleteOption key={websiteUrl}>{websiteUrl}</AutoCompleteOption>
    ));

    const {currentProject} = dataStoreContext;
    useEffect(() => {
        if (currentProject) {
            setFieldsValue({
                name: currentProject.name,
                title: currentProject.title,
                description: currentProject.description,
                siteName: currentProject.siteName,
                port: currentProject.port
            });
        }
    }, [currentProject]);

    return (
        <Form className="pi_cms_form project_form" onSubmit={handleSubmit}>
            <FormItem label="Name" extra={
                <ul>
                    <li>The name must be less than or equal to 214 characters. This includes the scope for
                        scoped packages.
                    </li>
                    <li>The name can’t start with a dot or an underscore.</li>
                    <li>New packages must not have uppercase letters in the name.</li>
                    <li>The name ends up being part of a URL, an argument on the command line, and a
                        folder name. Therefore, the name can’t contain any non-URL-safe characters.
                    </li>
                </ul>
            }>
                {getFieldDecorator("name", {
                    rules: [
                        {
                            required: true,
                            message: "Please input your project name!",

                        },
                    ],
                })(<Input placeholder="Name"/>)}
            </FormItem>
            <FormItem label="Title">
                {getFieldDecorator("title", {
                    rules: [
                        {
                            required: true,
                            message: "Please input your Project title!",
                        },
                    ],
                })(<Input placeholder="Title"/>)}
            </FormItem>
            <FormItem label="Description">
                {getFieldDecorator("description", {
                    rules: [
                        {
                            required: false,
                        }
                    ],
                })(<Input.TextArea placeholder="Description"/>)}
            </FormItem>
            <FormItem label="Site Name" extra={
                <p>Site Name will be used to create nginx configuration. Multiple names must be space separated. There
                    must not be any spaces within a single name. <a
                        href="https://nginx.org/en/docs/http/server_names.html">See here</a> for more information.</p>
            }>
                {getFieldDecorator("siteName", {
                    rules: [{required: true, message: "Please input sitename!"}],
                })(<Input placeholder="Site Name"/>)}
            </FormItem>

            {/*<FormItem label="Port" extra={*/}
            {/*<p>Specify the port in which the application will be mapped and be discoverable. Without the port you*/}
            {/*will not be able to access the site.</p>*/}
            {/*}>*/}

            {/*{getFieldDecorator("port", {*/}
            {/*rules: [*/}
            {/*{*/}
            {/*required: false,*/}
            {/*}*/}
            {/*],*/}
            {/*})(<Input placeholder="Port"/>)}*/}
            {/*</FormItem>*/}

            <FormItem>
                <Button type="primary" htmlType="submit">Save</Button>
            </FormItem>
        </Form>
    );
};

ProjectSettingForm.propTypes = {
    form: PropTypes.object
};

const WrappedProjectSettingForm = Form.create({name: "project_setting_form"})(ProjectSettingForm);

export default WrappedProjectSettingForm;
