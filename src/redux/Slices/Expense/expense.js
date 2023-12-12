import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import ExpenseServices from "../../Services/Expense.Services";

const initialState = {
    expense: [],
    singleExpense: null
};

export const AddExpense = (data, token, reset) => async (dispatch) => {
    try {
        const response = await ExpenseServices.AddExpense(data, token);
        console.log(response);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            reset();
            dispatch(GetExpense(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        console.log("AddExpense error===========>", error)
    };
};

export const GetExpense = (token) => async (dispatch) => {
    try {
        const response = await ExpenseServices.GetExpense(token);
        dispatch(Expense(response));
        return response;
    } catch (error) {
        console.log("GetLead error===========>", error)
    };
};

export const DeleteExpense = (id, token) => async (dispatch) => {
    try {
        const response = await ExpenseServices.DeleteExpense(id, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetExpense(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        console.log("DeleteExpense error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const GetExpenseById = (id, token) => async (dispatch) => {
    try {
        const response = await ExpenseServices.GetExpenseById(id, token);
        dispatch(SingleExpense(response));
        return response;
    } catch (error) {
        console.log("GetExpenseById error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const EditExpense = (id, data, token, reset) => async (dispatch) => {
    try {
        const response = await ExpenseServices.EditExpense(id, data, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetExpense(token));
            reset();
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        console.log("EditExpense error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const ExpenseSlice = createSlice({
    name: "ExpenseSlice",
    initialState,
    reducers: {
        Expense: (state, action) => {
            state.expense = action.payload
        },
        SingleExpense: (state, action) => {
            state.singleExpense = action.payload
        },
    },
});

export const {
    SingleExpense,
    Expense,
} = ExpenseSlice.actions;

export default ExpenseSlice.reducer;