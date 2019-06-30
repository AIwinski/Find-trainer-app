import { EDIT_PROFILE } from "../constants/action-types";

export const accountSettings = {
    isEditingProfile: false
};

export const auth = (state = accountSettings, action) => {
    switch (action.type) {
        case EDIT_PROFILE.PENDING:
            return {
                ...state,
                ...action.payload
            };
        case EDIT_PROFILE.SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case EDIT_PROFILE.ERROR:
            return {
                ...state,
                ...action.payload,
                ...action.error
            };
        default:
            return state;
    }
};
