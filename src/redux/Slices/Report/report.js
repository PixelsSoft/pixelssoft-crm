import { createSlice } from "@reduxjs/toolkit";
import ReportService from "../../Services/report.services";

const initialState = {
    reports: []
}

export const GetReport = ( token,params ) => async ( dispatch ) => {
    try {
        const response = await ReportService.getReport( token,params );
        return response
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const ReportSlice = createSlice( {
    name: "Report",
    initialState,
    reducers: {
        Reports: ( state, action ) => {
            state.reports = action.payload
        },
    },
} );

export const {
    Reports
} = ReportSlice.actions;

export default ReportSlice.reducer;