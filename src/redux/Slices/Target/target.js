import { createSlice } from "@reduxjs/toolkit";

import TargetService from "../../Services/target.services";

const initialState = {
    target: []
}

export const GetTargets = ( token ) => async ( dispatch ) => {
    try {
        const response = await TargetService.getTarget( token );
        return response
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const GetSingleTarget = (id, token , month) => async ( dispatch ) => {
    try {
        const response = await TargetService.getSingleTarget( id,token,month );
  
        return response
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};


export const TargetSlice = createSlice( {
    name: "Target",
    initialState,
    reducers: {
        Target: ( state, action ) => {
            state.category = action.payload
        },
    },
} );

export const {
    Category
} = TargetSlice.actions;

export default TargetSlice.reducer;