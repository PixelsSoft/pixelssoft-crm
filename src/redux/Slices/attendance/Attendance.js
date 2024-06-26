import { createSlice } from "@reduxjs/toolkit";
import attendancerServies from "../../Services/attendance";

const initialState = {
    Attendance: [],
    attendanceById: []

};
export const attendance = ( token ) => async ( dispatch ) => {
    try {
        await dispatch( attendancerServies.PerMonthAttendance( token ).then( ( response ) => {

            dispatch( GetAttendance( response?.data ) )

        } ).catch( ( err ) => {
            console.log( "err=======>", err )
        } ) )


    } catch ( error ) {
        console.log( "error while getting attendance===========>", error )
    }
};
export const AttendanceSlice = createSlice( {
    name: "Attendance",
    initialState,
    reducers: {
        GetAttendance: ( state, action ) => {
            state.Attendance = action.payload
        },
        GetAttendanceById: ( state, action ) => {
            state.attendanceById = action.payload
        },


    },
} );
export const {
    GetAttendance,
    GetAttendanceById,

} = AttendanceSlice.actions;
export default AttendanceSlice.reducer;