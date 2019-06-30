import React from "react";
import { Formik, Field, Form } from "formik";
import RatingInput from "./RatingInput";

const ReviewForm = props => {
    return (
        <Formik
            initialValues={{}}
            onSubmit={values => {
                console.log(values);
            }}
            render={() => (
                <Form className="review-container">
                    <RatingInput cb={value => console.log(value)} />

                    <button type="submit">sort</button>
                </Form>
            )}
        />
    );
};

export default ReviewForm;
