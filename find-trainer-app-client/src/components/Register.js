import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { ROLES } from "../constants/roles";
import SpinLoader from "./SpinLoader";

import { register } from "../actions/register";
import { reset_error } from "../actions/reset-error";

const RegisterValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Required"),
    password: Yup.string().required("Password is required"),
    passwordConfirm: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required")
});

class Register extends React.Component {
    componentWillUnmount() {
        this.props.reset_error();
    }

    render() {
        return (
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    role: "NORMAL",
                    first_name: "",
                    last_name: "",
                    city: "",
                    phone_number: ""
                }}
                validationSchema={RegisterValidationSchema}
                onSubmit={values => {
                    console.log(values);
                    this.props.register(values);
                }}
                render={({ values, setFieldValue }) => (
                    <div className="register">
                        {this.props.isRegistering && <SpinLoader />}
                        {this.props.error && (
                            <h1>rejestracja nie powiodla sie</h1>
                        )}
                        <Form className="form">
                            <div className="form__info">
                                {values.role === ROLES.PROFESSIONAL && (
                                    <span>Załóż konto jako trener.</span>
                                )}
                                {values.role === ROLES.NORMAL && (
                                    <span>
                                        Załóż konto jako zwykły użytkownik.
                                    </span>
                                )}
                            </div>
                            <div className="form__group">
                                <Field
                                    component="div"
                                    name="role"
                                    className="register__role"
                                >
                                    <div
                                        className={
                                            "register__option " +
                                            (values.role === ROLES.NORMAL
                                                ? "register__option--active"
                                                : "")
                                        }
                                        onClick={() => {
                                            setFieldValue("role", ROLES.NORMAL);
                                        }}
                                    >
                                        Zwykły użytkownik
                                    </div>
                                    <div
                                        className={
                                            "register__option " +
                                            (values.role === ROLES.PROFESSIONAL
                                                ? "register__option--active"
                                                : "")
                                        }
                                        onClick={() => {
                                            setFieldValue(
                                                "role",
                                                ROLES.PROFESSIONAL
                                            );
                                        }}
                                    >
                                        Trener
                                    </div>
                                </Field>
                            </div>

                            <div className="form__divider">
                                <div className="form__group">
                                    <label
                                        htmlFor="first_name"
                                        className="form__label"
                                    >
                                        First name
                                    </label>
                                    <Field
                                        name="first_name"
                                        className="form__input"
                                        id="first_name"
                                        placeholder="First name"
                                    />

                                    <ErrorMessage
                                        name="first_name"
                                        className="form__error"
                                        component="div"
                                    />
                                </div>
                                <div className="form__group">
                                    <label
                                        htmlFor="last_name"
                                        className="form__label"
                                    >
                                        Last name
                                    </label>
                                    <Field
                                        name="last_name"
                                        className="form__input"
                                        id="last_name"
                                        placeholder="Last name"
                                    />

                                    <ErrorMessage
                                        name="last_name"
                                        className="form__error"
                                        component="div"
                                    />
                                </div>
                            </div>
                            {values.role === ROLES.PROFESSIONAL && (
                                <React.Fragment>
                                    <div className="form__group">
                                        <label
                                            htmlFor="city"
                                            className="form__label"
                                        >
                                            City
                                        </label>
                                        <Field
                                            name="city"
                                            className="form__input"
                                            id="city"
                                            placeholder="City"
                                        />

                                        <ErrorMessage
                                            name="city"
                                            className="form__error"
                                            component="div"
                                        />
                                    </div>
                                    <div className="form__group">
                                        <label
                                            htmlFor="phone_number"
                                            className="form__label"
                                        >
                                            Phone numer
                                        </label>
                                        <Field
                                            name="phone_number"
                                            className="form__input"
                                            id="phone_number"
                                            type="tel"
                                            placeholder="Telephone number"
                                        />

                                        <ErrorMessage
                                            name="phone_number"
                                            className="form__error"
                                            component="div"
                                        />
                                    </div>
                                </React.Fragment>
                            )}
                            <div className="form__group">
                                <label htmlFor="email" className="form__label">
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    className="form__input"
                                    id="email"
                                    placeholder="Email"
                                />

                                <ErrorMessage
                                    name="email"
                                    className="form__error"
                                    component="div"
                                />
                            </div>
                            <div className="form__group">
                                <label
                                    htmlFor="password"
                                    className="form__label"
                                >
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    className="form__input"
                                    id="password"
                                    placeholder="Password"
                                />

                                <ErrorMessage
                                    name="password"
                                    className="form__error"
                                    component="div"
                                />
                            </div>
                            <div className="form__group">
                                <label
                                    htmlFor="confirm_password"
                                    className="form__label"
                                >
                                    Confirm password
                                </label>
                                <Field
                                    name="passwordConfirm"
                                    className="form__input"
                                    id="confirm_password"
                                    placeholder="Confirm password"
                                />

                                <ErrorMessage
                                    name="passwordConfirm"
                                    className="form__error"
                                    component="div"
                                />
                            </div>
                            <div className="form__group">
                                <button type="submit" className="form__submit">
                                    Register
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            />
        );
    }
}

const mapStateToProps = state => {
    return { isRegistering: state.auth.isRegistering, justRegistered: state.auth.justRegistered, error: state.error };
};

const mapDispatchToProps = {
    register,
    reset_error
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
