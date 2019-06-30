import { FILTER } from "../constants/action-types";

export const initialFilterState = {
    city: "All",
    min_price: 0,
    max_price: 1000,
    services: []
};

export const filters = (state = initialFilterState, action) => {
    switch (action.type) {
        case FILTER:
            console.log({ ...state, ...action.payload });
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
