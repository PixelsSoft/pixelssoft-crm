
import { createSlice } from "@reduxjs/toolkit";

import SalesServices from "../../Services/sales.services";

const initialState = {
    sales: [],
};
export const getSales = (token,selectedDate) => async (dispatch) => {
    try {
        const response = await SalesServices.getSales(token,selectedDate);
       return response
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const SalesSlice = createSlice({
    name: "Sales",
    initialState,
    reducers: {
        SaveSales: (state, action) => {
            state.roles = action.payload
        },
    },
});

export const {
    SaveSales,
} = SalesSlice.actions;

export default SalesSlice.reducer;