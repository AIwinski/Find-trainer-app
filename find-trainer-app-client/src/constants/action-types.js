const asyncActionType = type => ({
    PENDING: `${type}_PENDING`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`
});

export const LOGIN = asyncActionType("LOGIN");
export const REGISTER = asyncActionType("REGISTER");
export const EDIT_PROFILE = asyncActionType("EDIT_PROFILE");

export const FILTER = "FILTER";
export const SORT = "SORT";

export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";
export const LOGOUT = "LOGOUT";
export const SET_CURRENT_USER = "SET_CURRENT_USER";