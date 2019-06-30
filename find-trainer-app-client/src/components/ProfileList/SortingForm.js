import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { sort } from "../../actions/sort";

const SortingForm = props => {
    let { sorting } = props.sorting;

    return (
        <Formik
            initialValues={{
                sorting: sorting
            }}
            onSubmit={values => {
                console.log(values);
                props.sort(values.sorting);
            }}
            render={() => (
                <Form className="sorting">
                    <Field name="sorting" component="select">
                        <option value="price_asc">cena - rosnaca</option>
                        <option value="price_desc">cena - malejaco</option>
                        <option value="popularity_acs">
                            popularnosc - rosnaco
                        </option>
                        <option value="popularity_desc">
                            popularonosc - malejaco
                        </option>
                    </Field>

                    <button type="submit">sort</button>
                </Form>
            )}
        />
    );
};

const mapStateToProps = state => {
    return { sorting: state.sorting };
};

const mapDispatchToProps = {
    sort
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortingForm);
