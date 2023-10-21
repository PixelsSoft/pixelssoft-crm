import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';


const initialState = {

}
export const addEmployee = ( params ) => async ( dispatch ) => {
    try {
        const response = await EmployeeService.addEmployee( params );
        toast.success( response?.message, {
            position: toast.POSITION.TOP_RIGHT
        } );

    } catch ( error ) {
        console.log( "error===========>", error )
    }
};


export const ManagementSlice = createSlice( {
    name: "Management",
    initialState,
    reducers: {

    },
} );

export const {

} = ManagementSlice.actions;
export default ManagementSlice.reducer;