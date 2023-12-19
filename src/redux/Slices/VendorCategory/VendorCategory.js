import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import VendorCategoryServices from "../../Services/VendorCategory.services";

const initialState = {
    venCat: [],
}

export const AddVenCat = (data, token, reset) => async (dispatch) => {
    try {
        const response = await VendorCategoryServices.CreateVendorCategoryServices(data, token);
        if (response.status === 200) {
            reset();
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetVenCat(token));
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

export const GetVenCat = (data, token) => async (dispatch) => {
    try {
        const response = await VendorCategoryServices.GetVendorCategoryServices(data, token);
        dispatch(VenCat(response));
    } catch (error) {
        toast.error('Something went wrong', { position: toast.POSITION.TOP_RIGHT });
        console.log("error===========>", error)
    };
};

export const DeleVenCat = (id, token) => async (dispatch) => {
    try {
        const response = await VendorCategoryServices.DeleteCategoryServices(id, token);
        if (response?.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetVenCat(token));
        } else {
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        console.log("error===========>", error)
    };
};

export const UpdateVenCat = (id, data, token, reset) => async (dispatch) => {
    try {
        const response = await VendorCategoryServices.UpdateVenCat(id, data, token);
        if (response?.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetVenCat(token));
            reset();
        } else {
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        console.log("error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const VendorCategory = createSlice({
    name: "VendorCategory",
    initialState,
    reducers: {
        VenCat: (state, action) => {
            state.venCat = action.payload
        },
    },
});

export const {
    VenCat,
} = VendorCategory.actions;

export default VendorCategory.reducer;