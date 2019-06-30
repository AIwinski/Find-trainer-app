import { SORT } from "../constants/action-types";

export const initialSortingState = {
    sorting: "popularity_desc"
}

export const sorting = (state = initialSortingState, action) => {
    switch (action.type) {
        case SORT:
            console.log({ ...state, ...action.payload });
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
