import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import EmployeeService from "../../Services/employees.services";

const initialState = {

}
export const AddEmployee = (params, token) => async (dispatch) => {
    try {
        const response = await EmployeeService.AddEmployee(params, token);
        toast.success(response?.message, {
            position: toast.POSITION.TOP_RIGHT
        });

    } catch (error) {
        console.log("error===========>", error)
    };
};


export const EmployeeSlice = createSlice({
    name: "Employee",
    initialState,
    reducers: {

    },
});

export const {

} = EmployeeSlice.actions;
export default EmployeeSlice.reducer;