import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SpinLoader from "./SpinLoader";
import i18n from "i18next";

import { login } from "../actions/login";
import { reset_error } from "../actions/reset-error";

// Yup.setLocale({
//     string: {
//         email: i18n.t("test")
//     }
// });

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("auth.errors.wrong_email")
        .required("auth.errors.required_field"),
    password: Yup.string().required(i18n.t("auth.errors.required_field"))
});

class Login extends React.Component {
    state = {
        showLoginFirstMessage: (this.props.location.state && this.props.location.state.showLoginFirstMessage) || false
    };

    componentWillUnmount() {
        this.props.reset_error();
    }

    render() {
        const from = this.props.location.state ? this.props.location.state.from : null;
        return (
            <div className="login">
                {this.props.isLoggingIn && <SpinLoader />}
                {this.props.error && <h1>logowanie nie powiodlo sie</h1>}
                {this.state.showLoginFirstMessage && <h1>musisz sie najpierw zalogowac</h1>}
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginValidationSchema}
                    onSubmit={values => {
                        this.setState({ showLoginFirstMessage: false });
                        console.log(values);
                        let data = {
                            password: values.password,
                            email: values.email
                        };
                        this.props.reset_error();
                        this.props.login(data, from);
                    }}
                >
                    <Form className="form">
                        <div className="form__info">Zaloguj się</div>
                        <div className="form__group">
                            <label htmlFor="email" className="form__label">
                                Email
                            </label>
                            <Field id="email" name="email" className="form__input" placeholder="Email" />
                            <ErrorMessage name="email" render={msg => <div className="form__error">{msg}</div>} />
                        </div>
                        <div className="form__group">
                            <label htmlFor="password" className="form__label">
                                Password
                            </label>
                            <Field name="password" type="password" placeholder="password" className="form__input" id="password" />
                            <ErrorMessage name="password" className="form__error" component="div" />
                        </div>
                        <div className="form__group">
                            <button type="submit" className="form__submit">
                                Login
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        );
    }
}

const mapDispatchToProps = {
    login,
    reset_error
};

const mapStateToProps = state => {
    return { isLoggingIn: state.auth.isLoggingIn, error: state.error };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
