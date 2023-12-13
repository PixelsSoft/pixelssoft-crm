import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import EmployeeService from "../../Services/employees.services";
import { stopLoading } from "../utiltities/Utiltities";

const initialState = {
    roles: [],
    employees: [],
    singleEmployee: null,
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
        console.log('response', response);
        toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
        dispatch(GetEmployees(token));
    } catch (error) {
        dispatch(stopLoading())
        console.log("DeleteEmployee error===========>", error)
    }
}

export const GetEmployeeById = (id, token) => async (dispatch) => {
    try {
        const response = await EmployeeService.GetEmployeeId(id, token);
        dispatch(SingleEmployee(response));
    } catch (error) {
        dispatch(stopLoading())
        console.log("DeleteEmployee error===========>", error)
    }
}

export const UpdateEmployee = (id, data, token, reset) => async (dispatch) => {
    try {
        const response = await EmployeeService.UpdateEmployee(id, data, token);
        console.log('UpdateEmployee', response);
        // dispatch(GetEmployees(token));
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
        SingleEmployee: (state, action) => {
            state.singleEmployee = action.payload
        },
    },
});

export const {
    SingleEmployee,
    Employee,
    getRoles,
} = EmployeeSlice.actions;
export default EmployeeSlice.reducer;