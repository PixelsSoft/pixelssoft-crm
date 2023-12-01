import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import EmployeeService from "../../Services/employees.services";
import { stopLoading } from "../utiltities/Utiltities";

const initialState = {
    roles: [],
    employees: [],
}
export const AddEmployee = (params, token) => async (dispatch) => {
    try {
        const response = await EmployeeService.AddEmployee(params, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(stopLoading())
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
            dispatch(stopLoading())
        };
    } catch (error) {
        dispatch(stopLoading())
        console.log("error===========>", error)
    };
};

export const GetRoles = (token) => async (dispatch) => {
    try {
        const response = await EmployeeService.getEmployeeRoles(token);
        dispatch(getRoles(response));
    } catch (error) {
        console.log("getRoles error===========>", error)
    };
}

export const GetEmployees = (token) => async (dispatch) => {
    try {
        const response = await EmployeeService.getEmployee(token);
        dispatch(Employee(response));
    } catch (error) {
        dispatch(stopLoading())
    }
}

export const DeleteEmployee = (id, token) => async (dispatch) => {
    try {
        const response = await EmployeeService.DelteEmployee(id, token);
        toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
        GetEmployees();
    } catch (error) {
        dispatch(stopLoading())
        console.log("DeleteEmployee error===========>", error)
    }
}

export const EmployeeSlice = createSlice({
    name: "Employee",
    initialState,
    reducers: {
        getRoles: (state, action) => {
            state.roles = action.payload
        },
        Employee: (state, action) => {
            state.employees = action.payload
        },
    },
});

export const {
    Employee,
    getRoles,
} = EmployeeSlice.actions;
export default EmployeeSlice.reducer;