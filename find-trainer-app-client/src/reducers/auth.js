import {
    LOGIN,
    LOGOUT,
    REGISTER,
    SET_CURRENT_USER
} from "../constants/action-types";
import { ROLES } from "../constants/roles";

export const initialAuthState = {
    current_user: {
        avatar: "",
        first_name: "",
        last_name: "",
        role: ROLES.DEFAULT
    },
    token: "",
    isLoggingIn: false,
    isRegistering: false,
    isAuthenticated: false
};

export const auth = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                current_user: {
                    avatar: "",
                    first_name: "",
                    last_name: "",
                    role: ROLES.DEFAULT
                },
                token: ""
            };
        case LOGIN.PENDING:
            return {
                ...state,
                ...action.payload
            };
        case LOGIN.SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case LOGIN.ERROR:
            return {
                ...state,
                ...action.payload,
                ...action.error
            };
        case REGISTER.PENDING:
            return {
                ...state,
                ...action.payload
            };
        case REGISTER.SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case REGISTER.ERROR:
            return {
                ...state,
                ...action.payload,
                ...action.error
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                current_user: {
                    ...action.payload
                }
            };
        default:
            return state;
    }
};
