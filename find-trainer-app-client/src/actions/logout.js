import { LOGOUT } from "../constants/action-types";

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};
