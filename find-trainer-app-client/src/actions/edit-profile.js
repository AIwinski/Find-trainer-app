import { EDIT_PROFILE } from "../constants/action-types";

import { Account } from "../agent";

const editProfileStarted = () => ({
    type: EDIT_PROFILE.PENDING,
    payload: {
        isEditingProfile: true
    }
});

const editProfileSuccess = res => ({
    type: EDIT_PROFILE.SUCCESS,
    payload: {
        isEditingProfile: false
    }
});

const editProfileError = error => ({
    type: EDIT_PROFILE.ERROR,
    payload: {
        isEditingProfile: false
    },
    error: error
});

export const edit_profile = data => dispatch => {
    dispatch(editProfileStarted());
    Account.editProfile(data)
        .then(res => {
            dispatch(editProfileSuccess(res.data));
        })
        .catch(err => {
            dispatch(editProfileError(err));
        });
};
