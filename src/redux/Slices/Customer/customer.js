import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import CustomerService from "../../Services/customer.services";

const initialState = {
    customer: [],
    singleCustomer: null
}

export const GetCustomer = (token) => async (dispatch) => {
    try {
        const response = await CustomerService.getCustomer(token);
        dispatch(Customer(response));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const GetSingleCustomer = (profileId, token) => async (dispatch) => {
    try {
        const response = await CustomerService.SingleCustomer(profileId, token);
        dispatch(SingleCustomer(response));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const DeleteCustomer = (id, token, navigate) => async (dispatch) => {
    try {
        const response = await CustomerService.DeleteCustomer(id, token);
        if (response.message === "Customer Deleted Successfully") {
            toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
            navigate('/apps/customers');
            dispatch(GetCustomer(token));
            return;
        } else {
            toast.error(response.message[0], { position: toast.POSITION.TOP_RIGHT });
            return;
        };
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const CreateCustomerAPI = (data, token, reset) => async (dispatch) => {
    try {
        const response = await CustomerService.AddCustomer(data, token);
        if (response?.message === "Customer Created Successfully") {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetCustomer(token));
            reset();
            return;
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
            return;
        };
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const UpdateCustomerAPI = (profileId, data, token, toggleClose) => async (dispatch) => {
    try {
        const response = await CustomerService.UpdateCustomer(profileId, data, token);
        if (response?.message === 'Customer Updated Successfully') {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            toggleClose();
            dispatch(GetCustomer(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
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
        SingleCustomer: (state, action) => {
            state.singleCustomer = action.payload
        },
    },
});

export const {
    Customer,
    SingleCustomer
} = CustomerSlice.actions;

export default CustomerSlice.reducer;