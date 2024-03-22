import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import InvoiceService from "../../Services/Invoice.services";

const initialState = {
    Invoices: [],
    singleInvoice: null,
}

export const GetInvoice = ( token ) => async ( dispatch ) => {
    try {
        const response = await InvoiceService.getInvoices( token );
        dispatch( Invoices( response ) );
    } catch ( error ) {
        toast.error( 'Something went wrong', { position: toast.POSITION.TOP_RIGHT } );
        console.log( "error===========>", error )
    };
};

export const AddInvoice = ( data, token, reset ) => async ( dispatch ) => {
    try {
        const response = await InvoiceService.CreateInvoice( data, token );
        if ( response.status === 200 ) {
            reset();
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( GetInvoice( token ) );
        } else {
            toast.error( response?.message[0], { position: toast.POSITION.TOP_RIGHT } );
        };
        return response;
    } catch ( error ) {
        toast.error( 'Something went wrong', { position: toast.POSITION.TOP_RIGHT } );
        console.log( "error===========>", error )
    };
};

export const DeleteInvoice = ( projectId, token ) => async ( dispatch ) => {
    try {
        const response = await InvoiceService.DeleteInvoice( projectId, token );
        toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        dispatch( GetInvoice( token ) );
        return response;
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const GetInvoiceById = ( projectId, token ) => async ( dispatch ) => {
    try {
        const response = await InvoiceService.GetInvoiceById( projectId, token );
        dispatch( SingleInvoice( response ) );
        return response;
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const UpdateInvoice = ( projectId, body, token ) => async ( dispatch ) => {
    try {
        const response = await InvoiceService.UpdateInvoice( projectId, body, token );
        toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        dispatch( GetInvoice( token ) );
        return response;
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const InvoicesSlice = createSlice( {
    name: "Invoices",
    initialState,
    reducers: {
        Invoices: ( state, action ) => {
            state.Invoices = action.payload
        },
        SingleInvoice: ( state, action ) => {
            state.singleInvoice = action.payload
        },
    },
} );

export const {
    SingleInvoice,
    Invoices,
} = InvoicesSlice.actions;

export default InvoicesSlice.reducer;