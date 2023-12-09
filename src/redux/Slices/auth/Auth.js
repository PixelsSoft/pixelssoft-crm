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
        dispatch(GetEmployees(response?.data?.token));
        dispatch(GetCustomer(response?.data?.token));
        dispatch(GetInvoice(response?.data?.token));
        dispatch(GetProject(response?.data?.token));
        dispatch(GetPlatform(response?.data?.token));
        dispatch(GetCategory(response?.data?.token));
        dispatch(getRoles(response?.data?.token));
        dispatch(GetLead(response?.data?.token));
        dispatch(GetExpenseCategory(response?.data?.token));
        dispatch(GetExpense(response?.data?.token));
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