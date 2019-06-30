import { combineReducers } from "redux";

import { auth } from "./auth";
import { filters } from "./filters";
import { sorting } from "./sorting";
import { error } from "./error";

const rootReducer = combineReducers({
    auth,
    filters,
    sorting,
    error
});

export default rootReducer;
