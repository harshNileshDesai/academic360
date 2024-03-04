import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: { loading: false },
    reducers: {
        toogleLoading: (store) => {
            store.loading = !store.loading;
            return store;
        }
    }
});

export const { toogleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;