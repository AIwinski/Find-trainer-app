import { SORT } from "../constants/action-types";

export const sort = data => dispatch => {
    dispatch({
        type: SORT,
        payload: {
            ...data
        }
    });
};
