import { createSlice } from "@reduxjs/toolkit";
import RolesServices from "../../Services/roles.services";
import { toast } from "react-toastify";

const initialState = {
    roles: [],
};

export const getRoles = (token) => async (dispatch) => {
    try {
        const response = await RolesServices.getRoles(token);
        dispatch(userRoles(response.data));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const CreateNewRole = (data, token) => async (dispatch) => {
    try {
        const response = await RolesServices.newRole(data, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(getRoles(token));
        } else {
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        console.log("CreateNewRole error===========>", error)
    };
};

export const UpdateRole = (id, data, token) => async (dispatch) => {
    try {
        const response = await RolesServices.updateRole(id, data, token);
        if (response.status === 200) {
            dispatch(getRoles(token));
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
        } else {
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        console.log("CreateNewRole error===========>", error)
    };
};

export const DeleteRole = (id, token) => async (dispatch) => {
    try {
        const response = await RolesServices.DeleteRole(id, token);
        if (response.status === 200) {
            dispatch(getRoles(token));
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
        } else {
            toast.error(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        console.log("CreateNewRole error===========>", error)
    };
};

export const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        userRoles: (state, action) => {
            state.roles = action.payload
        },
    },
});

export const {
    userRoles,
} = AuthSlice.actions;

export default AuthSlice.reducer;