import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import loadingReducer from "./features/loadingSlice";

export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer
    },
});