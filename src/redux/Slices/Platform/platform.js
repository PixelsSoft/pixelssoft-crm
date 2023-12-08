import { createSlice } from "@reduxjs/toolkit";
import PlatformService from "../../Services/platform.services";
import { toast } from "react-toastify";

const initialState = {
    platform: [],
}

export const GetPlatform = (token) => async (dispatch) => {
    try {
        const response = await PlatformService.getPlatform(token);
        dispatch(Platforms(response));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const CreateNewPlatform = (data, token) => async (dispatch) => {
    try {
        const response = await PlatformService.newPlatform(data, token);
        toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
        dispatch(GetPlatform(token));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const UpdatePlatform = (id, data, token) => async (dispatch) => {
    try {
        const response = await PlatformService.UpdatePlatform(id, data, token);
        if (response?.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetPlatform(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const DeletePlatform = (id, token) => async (dispatch) => {
    try {
        const response = await PlatformService.DeletePlatform(id, token);
        if (response?.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetPlatform(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const PlatformSlice = createSlice({
    name: "Platforms",
    initialState,
    reducers: {
        Platforms: (state, action) => {
            state.platform = action.payload
        },
    },
});

export const {
    Platforms
} = PlatformSlice.actions;

export default PlatformSlice.reducer;