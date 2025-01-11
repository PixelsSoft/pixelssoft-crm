import { createSlice } from "@reduxjs/toolkit";

import CommissionService from "../../Services/commission.services";

const initialState = {
    Commission: []
}

export const GetCommission = ( token,formData ) => async ( dispatch ) => {
    try {
        const response = await CommissionService.getCommission( token,formData);
        return response
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const GetSingleCommission = (token , id, data) => async ( dispatch ) => {
    try {
        const response = await CommissionService.getSingleCommission( token,id,data );
  
        return response
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};


export const CommissionSlice = createSlice( {
    name: "Commission",
    initialState,
    reducers: {
        Commission: ( state, action ) => {
            state.Commission = action.payload
        },
    },
} );

export const {
    Category
} = CommissionSlice.actions;

export default CommissionSlice.reducer;