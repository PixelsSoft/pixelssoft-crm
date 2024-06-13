import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import BidServices from "../../Services/bids.services";

const initialState = {
    TodayBids: [],
    MonthBids: [],
    singleLead: null
};

export const AddBids = ( data, token, reset ) => async ( dispatch ) => {
    try {
        const response = await BidServices.Addbid( data, token );
        console.log( response );
        if ( response.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            reset();
            dispatch( GetTodayBids( token ) );
            dispatch( GetMonthBids( token ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
        return response;
    } catch ( error ) {
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
        console.log( "AddLead error===========>", error )
    };
};

export const GetTodayBids = ( token ) => async ( dispatch ) => {
    try {
        const response = await BidServices.GetTodayBids( token );
        dispatch( GetTodayBidsData( response ) );
        return response;
    } catch ( error ) {
        console.log( "Get Today Bids error===========>", error )
    };
};
export const GetMonthBids = ( token ) => async ( dispatch ) => {
    try {
        const response = await BidServices.GetMonthBids( token );
        dispatch( GetMonthBidsData( response ) );
        return response;
    } catch ( error ) {
        console.log( "Get Month bids error===========>", error )
    };
};

export const BidsSlice = createSlice( {
    name: "LeadSlice",
    initialState,
    reducers: {
        GetTodayBidsData: ( state, action ) => {
            state.TodayBids = action.payload
        },
        GetMonthBidsData: ( state, action ) => {
            state.MonthBids = action.payload
        },
    },
} );

export const {
    GetTodayBidsData,
    GetMonthBidsData,
} = BidsSlice.actions;

export default BidsSlice.reducer;