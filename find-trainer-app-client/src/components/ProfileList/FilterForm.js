import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { filter } from "../../actions/filter";
import InputRange from "react-input-range";
import Select from "react-select";

const options = [
    //to do add translation
    { value: "Food", label: "Food" },
    { value: "Being Fabulous", label: "Being Fabulous" },
    { value: "Ken Wheeler", label: "Ken Wheeler" },
    { value: "ReasonML", label: "ReasonML" },
    { value: "Unicorns", label: "Unicorns" },
    { value: "Kittens", label: "Kittens" }
];

const FilterForm = props => {
    //filtry: miasto, cena - przedział, usługi: lista
    let { city, price_range, services } = props.filters;
    return (
        <Formik
            initialValues={{
                city: city,
                price_range: price_range,
                services: services
            }}
            onSubmit={values => {
                console.log(values);
                props.filter(values);
                window.scrollTo(0, 0);
            }}
            render={({
                setFieldValue,
                values,
                touched,
                setFieldTouched,
                errors
            }) => (
                <Form className="filter">
                    <Field name="city" component="select">
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="All">all</option>
                    </Field>
                    <InputRange
                        maxValue={1000}
                        minValue={0}
                        name="price_range"
                        value={values.price_range}
                        onChange={value => setFieldValue("price_range", value)}
                    />
                    <Select
                        value={values.services}
                        onChange={value => setFieldValue("services", value)}
                        onBlur={() => setFieldTouched("services", true)}
                        error={errors.services}
                        touched={touched.services}
                        value={values.services}
                        isMulti
                        options={options}
                        classNamePrefix="react-select"
                    />

                    <button type="submit">filter</button>
                </Form>
            )}
        />
    );
};

const mapStateToProps = state => {
    return { filters: state.filters };
};

const mapDispatchToProps = {
    filter
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterForm);
