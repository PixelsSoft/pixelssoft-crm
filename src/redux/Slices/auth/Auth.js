import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import authService from "../../Services/auth.services";

const initialState = {
    user: {
        id: 1,
        name: "",
        email: "",
        email_verified_at: null,
        created_at: "",
        updated_at: "",
        role: ""

    },

    permissions: null,
    token: null,
    userAuthenticate: false,
    loading: false,
    error: null,
    passwordReset: null,
    resetPasswordSuccess: {
        message: null
    },
    userSignUp: null

};

export const login = (params) => async (dispatch) => {
    try {
        const response = await authService.login(params);
        dispatch(loginUser(response?.data?.user));
        dispatch(userPermission(response?.data?.permission));
        dispatch(userToken(response?.data?.token));
        toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutUser())
    } catch (error) {
        console.log("error===========>", error)
    }
};

export const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        resetAuth: (state, action) => {

        },
        loginUser: (state, action) => {
            state.user = action.payload
            state.userAuthenticate = true
        },
        userToken: (state, action) => {
            state.token = action.payload
        },
        forgotPassword: (state, action) => {

        },
        logoutUser: (state, action) => {
            state.user = ""
            state.permissions = ""
            state.token = null
            state.userAuthenticate = false

        },
        signupUser: (state, action) => {
            state.userSignUp = action.payload;
        },
        userPermission: (state, action) => {
            state.permissions = action.payload;
        },

    },
});

export const {
    resetAuth,
    loginUser,
    forgotPassword,
    logoutUser,
    signupUser,
    userPermission,
    userToken,
} = AuthSlice.actions;
export default AuthSlice.reducer;