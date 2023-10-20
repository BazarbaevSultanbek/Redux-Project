import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/useReducer";


export const store = configureStore({
    reducer:{
        items:userReducer,
    }
})