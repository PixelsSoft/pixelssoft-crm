import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import VendorPaymentServices from "../../Services/VendorPayment.services";

const initialState = {
    vendorPayments: [],
    singleVendor: null,
}

export const AddVendorPayment = (data, token, reset) => async (dispatch) => {
    try {
        const response = await VendorPaymentServices.CreateVendorPayment(data, token);
        if (response.status === 200) {
            reset();
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetVendorPayments(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        console.log("error===========>", error)
    };
};

export const GetVendorPayments = (token) => async (dispatch) => {
    try {
        const response = await VendorPaymentServices.GetVendorPayments(token);
        dispatch(VendorPayments(response));
    } catch (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        console.log("error===========>", error)
    };
};

export const DeleVendorPayment = (id, token) => async (dispatch) => {
    try {
        const response = await VendorPaymentServices.DeleteVendorPayment(id, token);
        if (response?.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetVendorPayments(token));
        } else {
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        console.log("error===========>", error)
    };
};

export const GetVendorById = (id, token) => async (dispatch) => {
    try {
        if (id) {
            const response = await VendorPaymentServices.GetVendorPaymentById(id, token);
            dispatch(SingleVendor(response));
        }
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const UpdateVendorPayment = (id, data, token, reset) => async (dispatch) => {
    try {
        const response = await VendorPaymentServices.UpdateVendorPayment(id, data, token);
        if (response?.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetVendorPayments(token));
            reset();
        } else {
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        console.log("error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const VendorPayment = createSlice({
    name: "VendorPayment",
    initialState,
    reducers: {
        VendorPayments: (state, action) => {
            state.vendorPayments = action.payload
        },
        SingleVendor: (state, action) => {
            state.singleVendor = action.payload
        },
    },
});

export const {
    SingleVendor,
    VendorPayments,
} = VendorPayment.actions;

export default VendorPayment.reducer;