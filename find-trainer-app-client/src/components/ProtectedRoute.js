import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location, showLoginFirstMessage: true }
                        }}
                    />
                );
            }}
        />
    );
};

const mapStateToProps = state => {
    return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(
    mapStateToProps,
    null
)(ProtectedRoute);
