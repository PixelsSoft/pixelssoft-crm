import { createSlice } from "@reduxjs/toolkit";

export const utiltitiesSlice = createSlice( {
    name: "utiltities",
    initialState: {
        loading: false
    },


    reducers: {
        startLoading: ( state ) => {
            state.loading = true
        },
        stopLoading: ( state ) => {
            state.loading = false
        },


    },
} );

export const {
    startLoading,
    stopLoading
} = utiltitiesSlice.actions;
export default utiltitiesSlice.reducer;