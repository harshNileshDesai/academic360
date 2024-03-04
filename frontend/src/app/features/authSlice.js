import { createSlice } from "@reduxjs/toolkit";

const profile = JSON.parse(localStorage.getItem('profile'));

const initialState = {
    auth: profile ? profile : null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (store, action) => {
            store.auth = action.payload.profile;
            localStorage.setItem('profile', JSON.stringify(action.payload.profile));
            return store;
        }
    }
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;