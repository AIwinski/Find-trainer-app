import { RESET_ERROR_MESSAGE } from "../constants/action-types";

export const reset_error = () => dispatch => {
    dispatch({
        type: RESET_ERROR_MESSAGE
    });
};
