import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import authService from "../../Services/auth.services";
import { GetEmployees } from "../employee/Employee";
import { GetCustomer } from "../Customer/customer";
import { GetInvoice } from "../Invoices/Invoices";
import { GetProject } from "../Project/Project";
import { GetPlatform } from "../Platform/platform";
import { GetCategory } from "../Category/category";
import { getRoles } from "../Roles/Roles";
import { GetLead } from "../Leads/leads";
import { GetExpenseCategory } from "../ExpenseCategory/expenseCategory";
import { GetExpense } from "../Expense/expense";
import { GetVenCat } from "../VendorCategory/VendorCategory";
import { GetVendor } from "../Vendor/Vendor";
import { GetVendorPayments } from "../VendorPayment/VendorPayment";

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

export const login = ( params ) => async ( dispatch ) => {
    try {
        const response = await authService.login( params );
        await dispatch( loginUser( response?.data?.user ) );
        await dispatch( userPermission( response?.data?.permission ) );
        await dispatch( userToken( response?.data?.token ) );
        await dispatch( GetEmployees( response?.data?.token ) );
        await dispatch( GetCustomer( response?.data?.token ) );
        await dispatch( GetInvoice( response?.data?.token ) );
        await dispatch( GetProject( response?.data?.token ) );
        await dispatch( GetPlatform( response?.data?.token ) );
        await dispatch( GetCategory( response?.data?.token ) );
        await dispatch( getRoles( response?.data?.token ) );
        await dispatch( GetLead( response?.data?.token ) );
        await dispatch( GetExpenseCategory( response?.data?.token ) );
        await dispatch( GetExpense( response?.data?.token ) );
        await dispatch( GetVenCat( response?.data?.token ) );
        await dispatch( GetVendor( response?.data?.token ) );
        await dispatch( GetVendorPayments( response?.data?.token ) );
        toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const logout = () => async ( dispatch ) => {
    try {
        dispatch( logoutUser() )
    } catch ( error ) {
        console.log( "error===========>", error )
    }
};

export const AuthSlice = createSlice( {
    name: "Auth",
    initialState,
    reducers: {
        resetAuth: ( state, action ) => {

        },
        loginUser: ( state, action ) => {
            state.user = action.payload
            state.userAuthenticate = true
        },
        userToken: ( state, action ) => {
            state.token = action.payload
        },
        forgotPassword: ( state, action ) => {

        },
        logoutUser: ( state, action ) => {
            state.user = ""
            state.permissions = ""
            state.token = null
            state.userAuthenticate = false

        },
        signupUser: ( state, action ) => {
            state.userSignUp = action.payload;
        },
        userPermission: ( state, action ) => {
            state.permissions = action.payload;
        },

    },
} );

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