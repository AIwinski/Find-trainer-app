import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SpinLoader from "../../SpinLoader";
import Dropzone from "react-dropzone";

import { Account, Profiles } from "../../../agent";
import ImageThumb from "./ImageThumb";
import uniqueValuesObject from "../../../utils/uniqueValuesObject";

import { setCurrentUser } from "../../../actions/set-current-user";

// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
// const MAX_AVATAR_SIZE = 3000000; //max 3 mb

const editGeneralInfoValidationSchema = Yup.object().shape({
    // avatar: Yup.mixed()
    //     .test(
    //         "fileSize",
    //         "File Size is too large",
    //         value => value.size <= MAX_AVATAR_SIZE
    //     )
    //     .test("fileType", "Unsupported File Format", value =>
    //         SUPPORTED_FORMATS.includes(value.type)
    //     )
});

class EditGeneralInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            generalInfo: null
        };
    }
    componentDidMount() {
        Profiles.getProfile(this.props.id)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    this.setState({
                        isLoading: false,
                        generalInfo: {
                            first_name: res.data.profile.first_name,
                            last_name: res.data.profile.last_name,
                            city: res.data.profile.city,
                            description: res.data.profile.description,
                            address: res.data.profile.address,
                            avatar: res.data.profile.avatar
                        }
                    });
                } else {
                    //error
                    console.log("huj");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="edit-profile">
                {this.props.isUpdatingProfile && <SpinLoader />}
                {this.props.error && (
                    <h1>updatowanie profilu nie powiodlo sie</h1>
                )}
                {this.state.isLoading ? (
                    <SpinLoader />
                ) : (
                    <Formik
                        initialValues={{
                            first_name: this.state.generalInfo.first_name,
                            last_name: this.state.generalInfo.last_name,
                            city: this.state.generalInfo.city,
                            avatar: this.state.generalInfo.avatar,
                            address: this.state.generalInfo.address,
                            description: this.state.generalInfo.description
                        }}
                        validationSchema={editGeneralInfoValidationSchema}
                        onSubmit={values => {
                            const data = uniqueValuesObject(
                                values,
                                this.state.generalInfo
                            );
                            console.log(data);
                            Account.editProfile(this.props.id, {
                                fields: data
                            }).then(res => {
                                console.log(res);
                                const currentUser = {
                                    first_name: res.data.profile.first_name,
                                    last_name: res.data.profile.last_name,
                                    _id: res.data.profile._id,
                                    role: res.data.profile.role
                                };
                                this.props.setCurrentUser(currentUser);
                            });
                        }}
                        render={({ values, setFieldValue }) => {
                            return (
                                <div className="edit-profile__general">
                                    <Form className="form">
                                        <div className="form__info">
                                            Edytuj generalne informacje profilu
                                        </div>
                                        <div className="form__group">
                                            <label
                                                htmlFor="first_name"
                                                className="form__label"
                                            >
                                                First name
                                            </label>
                                            <Field
                                                id="first_name"
                                                name="first_name"
                                                className="form__input"
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
                                                id="last_name"
                                                name="last_name"
                                                className="form__input"
                                                placeholder="Last name"
                                            />
                                            <ErrorMessage
                                                name="last_name"
                                                className="form__error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form__group">
                                            <label
                                                htmlFor="city"
                                                className="form__label"
                                            >
                                                City
                                            </label>
                                            <Field
                                                id="city"
                                                name="city"
                                                className="form__input"
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
                                                htmlFor="description"
                                                className="form__label"
                                            >
                                                Description
                                            </label>
                                            <Field
                                                component="textarea"
                                                id="description"
                                                name="description"
                                                className="form__input"
                                                placeholder="Description"
                                            />
                                            <ErrorMessage
                                                name="description"
                                                className="form__error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form__group">
                                            <label
                                                htmlFor="address"
                                                className="form__label"
                                            >
                                                Address
                                            </label>
                                            <Field
                                                id="address"
                                                name="address"
                                                className="form__input"
                                                placeholder="Address"
                                            />
                                            <ErrorMessage
                                                name="address"
                                                className="form__error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form__group">
                                            <label
                                                htmlFor="avatar"
                                                className="form__label"
                                            >
                                                Avatar
                                            </label>
                                            <input
                                                id="avatar"
                                                name="avatar"
                                                type="file"
                                                onChange={event => {
                                                    setFieldValue(
                                                        "avatar",
                                                        event.currentTarget
                                                            .files[0]
                                                    );
                                                }}
                                                className="form__input"
                                            />
                                            <ImageThumb image={values.avatar} />
                                            <ErrorMessage
                                                name="avatar"
                                                className="form__error"
                                                component="div"
                                            />
                                        </div>
                                        <div className="form__group">
                                            <button
                                                type="submit"
                                                className="form__submit"
                                            >
                                                Edytuj
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            );
                        }}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { id: state.auth.current_user._id };
};

const mapDispatchToProps = {
    setCurrentUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGeneralInfo);
