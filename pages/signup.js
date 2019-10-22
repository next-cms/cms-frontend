import React, { useState } from "react";

import { Button, Form, Input } from "antd";

import "../styles/scss/signup.scss";
import { useMutation } from "graphql-hooks";
import { redirectTo } from "../components/common/Redirect";
import * as PropTypes from "prop-types";
import { SIGNUP } from "../utils/GraphQLConstants";
import RoutesInfo from "../constants/RoutesInfo";

const SignUp = props => {
    const [state, setState] = useState(false);

    const [signUp] = useMutation(SIGNUP);

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                const result = await signUp({
                    variables: values
                });

                if (!result.error) {
                    return await redirectTo(RoutesInfo.Login.path, { status: 200 });
                }
            }
        });
    };

    const handleConfirmBlur = e => {
        const {value} = e.target;
        setState({confirmDirty: state || !!value});
    };

    const compareToFirstPassword = (rule, value, callback) => {
        const {form} = props;
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        const {form} = props;
        if (value && setState({confirmDirty: state})) {
            form.validateFields(["confirm"], {force: true});
        }
        callback();
    };

    const {getFieldDecorator} = props.form;

    return (
        <div className="signup">
            <h2>Registration Form</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Item label="Name">
                    {getFieldDecorator("name", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your nickname!",
                                whitespace: true
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label="E-mail">
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                type: "email",
                                message: "The input is not valid E-mail!"
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!"
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your password!"
                            },
                            {
                                validator: validateToNextPassword
                            }
                        ]
                    })(<Input.Password/>)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator("confirm", {
                        rules: [
                            {
                                required: true,
                                message: "Please confirm your password!"
                            },
                            {
                                validator: compareToFirstPassword
                            }
                        ]
                    })(<Input.Password onBlur={handleConfirmBlur}/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    Or <a href={RoutesInfo.Login.path}>Already have an account!</a>
                </Form.Item>
            </Form>
        </div>
    );
};

SignUp.propTypes = {
    form: PropTypes.object
};

const WrappedRegistrationForm = Form.create({name: "signup"})(SignUp);

WrappedRegistrationForm.isSimpleLayout = true;

export default WrappedRegistrationForm;
