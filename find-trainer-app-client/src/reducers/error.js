import { RESET_ERROR_MESSAGE } from "../constants/action-types";

// Updates error message to notify about the failed fetches.
export const error = (state = null, action) => {
    const { type, error } = action;

    if (type === RESET_ERROR_MESSAGE) {
        return null;
    } else if (error) {
        return error;
    }

    return state;
};
