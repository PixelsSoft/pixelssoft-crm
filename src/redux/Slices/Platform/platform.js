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