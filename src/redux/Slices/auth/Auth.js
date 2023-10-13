import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CONSTANTS } from "../../../constants/constant";
import authService from "../../Services/auth.services";

const initialState = {
    user: "ascjhas",
    loading: false,
    error: "",
    userLoggedIn: "",
    passwordReset: "",
    resetPasswordSuccess: {
        message: ""
    },
    userSignUp: ""

}
export const login = ( email, password ) => async ( dispatch ) => {
    try {
        const response = await axios.post( 'https://crm.pixelssoft.com/api/user/login', {
            params: {
                email: email, password: password
            }
        } );



        console.log( "response===========>", response )
    } catch ( error ) {
        console.log( "error===========>", error )


    }
};
// export const login = createAsyncThunk(
//     { email, password },
//     CONSTANTS.API_URLS.LOGIN,
//     async ( { email, password }, thunk ) => {
//         try {
//             const response = await authService.login( email, password );
//             console.log( "response=====>", response )
//             if ( response.status === 1 )
//                 thunk.dispatch( AuthSlice.actions.saveAccessToken( response.data.token ) );
//             return thunk.fulfillWithValue( response );
//         } catch ( error ) {
//             console.log( "error=====>", error )

//             return thunk.rejectWithValue( error );
//         }
//     },
// );
export const AuthSlice = createSlice( {
    name: "Auth",
    initialState,


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