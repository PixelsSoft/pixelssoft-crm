import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import InvoiceService from "../../Services/Invoice.services";

const initialState = {
    Invoices: [],
}

export const GetInvoice = (token) => async (dispatch) => {
    try {
        const response = await InvoiceService.getInvoices(token);
        dispatch(Invoices(response));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const AddInvoice = (token) => async (dispatch) => {
    try {
        const response = await InvoiceService.CreateInvoice(token);
        toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const InvoicesSlice = createSlice({
    name: "Invoices",
    initialState,
    reducers: {
        Invoices: (state, action) => {
            state.Invoices = action.payload
        },
    },
});

export const {
    Invoices
} = InvoicesSlice.actions;

export default InvoicesSlice.reducer;