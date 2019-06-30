import { REGISTER } from "../constants/action-types";

import { Auth } from "../agent";
import { history } from "../components/App";

const registerStarted = () => ({
    type: REGISTER.PENDING,
    payload: {
        isRegistering: true
    }
});

const registerSuccess = () => ({
    type: REGISTER.SUCCESS,
    payload: {
        isRegistering: false,
        justRegistered: true
    }
});

const registerError = error => ({
    type: REGISTER.ERROR,
    payload: {
        isRegistering: false
    },
    error: error
});

export const register = data => dispatch => {
    dispatch(registerStarted());
    Auth.register(data)
        .then(res => {
            console.log(res)
            dispatch(registerSuccess());
            history.push('/')
        })
        .catch(err => {
            dispatch(registerError(err));
        });
};
