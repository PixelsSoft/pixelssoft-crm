import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import ExpenseCategoryServices from "../../Services/ExpenseCategory.services";

const initialState = {
    expenseCategory: [],
};

export const AddExpenseCategory = (data, token, reset) => async (dispatch) => {
    try {
        const response = await ExpenseCategoryServices.AddExpenseCategory(data, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            reset();
            dispatch(GetExpenseCategory(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        console.log("AddExpenseCategory error===========>", error)
    };
};

export const GetExpenseCategory = (token) => async (dispatch) => {
    try {
        const response = await ExpenseCategoryServices.GetExpenseCategory(token);
        dispatch(ExpenseCategory(response));
        return response;
    } catch (error) {
        console.log("GetLead error===========>", error)
    };
};

export const DeleteExpenseCategory = (id, token) => async (dispatch) => {
    try {
        const response = await ExpenseCategoryServices.DeleteExpenseCategory(id, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetExpenseCategory(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        console.log("DeleteExpenseCategory error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const EditExpenseCategory = (id, data, token, reset) => async (dispatch) => {
    try {
        const response = await ExpenseCategoryServices.EditExpenseCategory(id, data, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetExpenseCategory(token));
            reset();
        };
        return response;
    } catch (error) {
        console.log("EditExpenseCategory error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const ExpenseCategorySlice = createSlice({
    name: "ExpenseCategorySlice",
    initialState,
    reducers: {
        ExpenseCategory: (state, action) => {
            state.expenseCategory = action.payload
        },
    },
});

export const {
    ExpenseCategory,
} = ExpenseCategorySlice.actions;

export default ExpenseCategorySlice.reducer;