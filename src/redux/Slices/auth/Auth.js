import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice( {
    name: "Auth",
    initialState: {
        user: "ascjhas",
        loading: false,
        error: "",
        userLoggedIn: "",
        passwordReset: "",
        resetPasswordSuccess: {
            message: ""
        },
        userSignUp: ""

    },
    reducers: {
        resetAuth: ( state, action ) => {

        },
        loginUser: ( state, action ) => {

        },
        forgotPassword: ( state, action ) => {

        },
        logoutUser: ( state, action ) => {

        },
        signupUser: ( state, action ) => {
            state.userSignUp = action.payload;
        },

    },
} );

export const { resetAuth, loginUser, forgotPassword, logoutUser, signupUser } = AuthSlice.actions;
export default AuthSlice.reducer;