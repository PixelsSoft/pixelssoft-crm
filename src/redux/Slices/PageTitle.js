import { createSlice } from "@reduxjs/toolkit";

export const pageTitleSlice = createSlice( {
    name: "pageTitle",
    initialState: {
        pageTitle: {
            title: '',
            breadCrumbItems: [
                {
                    label: '',
                    path: '',
                },
            ],
        },
    },
    reducers: {
        setPageTitle: ( state, action ) => {
            state.pageTitle = action.payload;
        },
    },
} );

export const { setPageTitle } = pageTitleSlice.actions;
export default pageTitleSlice.reducer;