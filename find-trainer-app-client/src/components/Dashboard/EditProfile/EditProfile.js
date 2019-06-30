import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SpinLoader from "../../SpinLoader";

import { Profiles } from "../../../agent";

const editProfileValidationSchema = Yup.object().shape({});

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                first_name: "",
                last_name: "",
                city: "",
                country: "",
                avatar: "",
                images: [],
                phone_number: "",
                address: "",
                description: "",
                price_list: [],
                password: "",
                repeat_password: ""
            }
        }
    }

    componentDidMount() {
        Profiles.getProfile(this.props.current_user._id).then(res => {
            this.setState({ profile: res.data.profile });
        });
    }

    render() {
        return (
            <div className="edit-profile">
                {this.props.isUpdatingProfile && <SpinLoader />}
                {this.props.error && (
                    <h1>updatowanie profilu nie powiodlo sie</h1>
                )}
                <Formik
                    initialValues={{
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        city: this.state.city,
                        country: this.state.country,
                        avatar: this.state.avatar,
                        images: this.state.images,
                        price_list: this.state.price_list
                    }}
                    validationSchema={editProfileValidationSchema}
                    onSubmit={values => {
                        console.log(values);
                        let data = {};
                        this.props.reset_error();
                        this.props.u(data);
                    }}
                >
                    <Form className="form">
                        <div className="form__info">Zaloguj się</div>
                        <div className="form__group">
                            <label htmlFor="email" className="form__label">
                                Email
                            </label>
                            <Field
                                id="email"
                                name="email"
                                className="form__input"
                                placeholder="Email"
                            />
                            <ErrorMessage
                                name="email"
                                render={msg => (
                                    <div className="form__error">{msg}</div>
                                )}
                            />
                        </div>
                        <div className="form__group">
                            <label htmlFor="password" className="form__label">
                                Password
                            </label>
                            <Field
                                name="password"
                                type="password"
                                placeholder="password"
                                className="form__input"
                                id="password"
                            />
                            <ErrorMessage
                                name="password"
                                className="form__error"
                                component="div"
                            />
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

const mapStateToProps = state => {
    return { isUpdatingProfile: state.isUpdatingProfile, error: state.error, current_user: state.auth.current_user };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile);
