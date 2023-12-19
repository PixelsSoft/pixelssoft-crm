import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import VendorServices from "../../Services/Vendor.services";

const initialState = {
    vendors: [],
}

export const AddVendor = (data, token, reset) => async (dispatch) => {
    try {
        const response = await VendorServices.CreateVendorServices(data, token);
        if (response.status === 200) {
            reset();
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetVendor(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT });
        console.log("error===========>", error)
    };
};

export const GetVendor = (token) => async (dispatch) => {
    try {
        const response = await VendorServices.GetVendors(token);
        dispatch(Vendors(response));
    } catch (error) {
        toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT });
        console.log("error===========>", error)
    };
};

export const UpdateVendor = (id, data, token, reset) => async (dispatch) => {
    try {
        const response = await VendorServices.UpdateVendor(id, data, token);
        if (response?.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetVendor(token));
            reset();
        } else {
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        console.log("error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const DeleVendor = (id, token) => async (dispatch) => {
    try {
        const response = await VendorServices.DeleteCategory(id, token);
        if (response?.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetVendor(token));
        } else {
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        console.log("error===========>", error)
    };
};

export const Vendor = createSlice({
    name: "Vendor",
    initialState,
    reducers: {
        Vendors: (state, action) => {
            state.vendors = action.payload
        },
    },
});

export const {
    Vendors,
} = Vendor.actions;

export default Vendor.reducer;