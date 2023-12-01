import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import CustomerService from "../../Services/customer.services";

const initialState = {
    customer: []
}

export const GetCustomer = (token) => async (dispatch) => {
    try {
        const response = await CustomerService.getCustomer(token);
        dispatch(Customer(response));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const CreateCustomerAPI = (data, token) => async (dispatch) => {
    try {
        const response = await CustomerService.AddCustomer(data, token);
        if (response.message === "Customer Created Successfully") {
            toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
            return;
        } else if (response.message[0] === 'The email has already been taken.') {
            toast.error(response.message[0], { position: toast.POSITION.TOP_RIGHT });
            return;
        } else {
            toast.error('Something Went Wrong', { position: toast.POSITION.TOP_RIGHT });
            return;
        };
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const CustomerSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {
        Customer: (state, action) => {
            state.customer = action.payload
        },
    },
});

export const {
    Customer
} = CustomerSlice.actions;

export default CustomerSlice.reducer;