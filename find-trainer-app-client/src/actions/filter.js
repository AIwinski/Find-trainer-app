import { FILTER } from "../constants/action-types";

export const filter = data => dispatch => {
    dispatch({
        type: FILTER,
        payload: {
            ...data
        }
    });
};
