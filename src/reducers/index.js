import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"
import profileReducer from "../slices/ProfileSlice"
import bugReducer from "../slices/BugSlice"
const rootReducer = combineReducers(
    {
        auth : authReducer,
        profile : profileReducer,
        bug : bugReducer,

    }
)
export default rootReducer;