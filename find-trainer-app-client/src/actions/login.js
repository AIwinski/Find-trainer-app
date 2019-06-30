import { LOGIN } from "../constants/action-types";

import { Auth } from "../agent";
import { history } from "../components/App";
import { ROLES } from "../constants/roles";

const loginStarted = () => ({
    type: LOGIN.PENDING,
    payload: {
        isLoggingIn: true
    }
});

const loginSuccess = res => ({
    type: LOGIN.SUCCESS,
    payload: {
        current_user: res.user,
        isLoggingIn: false,
        isAuthenticated: true,
        token: res.token,
        justRegistered: false
    }
});

const loginError = error => ({
    type: LOGIN.ERROR,
    payload: {
        isLoggingIn: false
    },
    error: error
});

export const login = (data, from) => dispatch => {
    dispatch(loginStarted());
    Auth.login(data)
        .then(res => {
            dispatch(loginSuccess(res.data));

            if (from != null) {
                history.push(from.pathname);
            } else {
                if (res.data.user.role === ROLES.PROFESSIONAL) {
                    history.push("/edit1");
                } else {
                    history.push("/");
                }
            }
        })
        .catch(err => {
            dispatch(loginError(err));
        });
};
