import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { logout } from "../actions/logout";

import { history } from "./App";

const Header = props => {
    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        if (i18n.language.toLowerCase().includes("en")) {
            i18n.changeLanguage("pl");
        } else if (i18n.language.toLowerCase().includes("pl")) {
            i18n.changeLanguage("en");
        }
    };

    return (
        <nav className="nav">
            <div className="nav__left">
                <div className="nav__item">
                    <Link className="nav__link" to="/">
                        {t("test")}
                    </Link>
                </div>
            </div>
            <div className="nav__right">
                <div className="nav__item">
                    <Link className="nav__link" to="/profiles">
                        Profiles
                    </Link>
                </div>
                <div className="nav__item">
                    <Link className="nav__link" to="/chat">
                        Chat
                    </Link>
                </div>
                <div className="nav__item">
                    <Link className="nav__link" to="/">
                        Home
                    </Link>
                </div>
                {props.isAuthenticated ? (
                    <React.Fragment>
                        <div className="nav__item">
                            <Link className="nav__link" to="/chat">
                                Chat
                            </Link>
                        </div>
                        <div className="nav__item">
                            currentUser:{" "}
                            {props.current_user.first_name +
                                " " +
                                props.current_user.last_name}
                        </div>
                        <div className="nav__item">
                            <span
                                className="nav__link"
                                onClick={() => {
                                    console.log(history)
                                    history.push("/");
                                    props.logout();
                                }}
                            >
                                logout
                            </span>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="nav__item">
                            <Link className="nav__link" to="/login">
                                Login
                            </Link>
                        </div>
                        <div className="nav__item">
                            <Link className="nav__link" to="/register">
                                Register
                            </Link>
                        </div>
                    </React.Fragment>
                )}
                <div className="nav__item">
                    <button onClick={changeLanguage}>{i18n.language}</button>
                </div>
            </div>
            <button className="nav__toggle">=</button>
        </nav>
    );
};

const mapStateToProps = state => {
    return {
        current_user: state.auth.current_user,
        isAuthenticated: state.auth.isAuthenticated
    };
    // return { currentUser: null };
};

const mapDispatchToProps = {
    logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
