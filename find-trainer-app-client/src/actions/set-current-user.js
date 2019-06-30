import { SET_CURRENT_USER } from "../constants/action-types";

export const setCurrentUser = data => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: {
            ...data
        }
    });
};
