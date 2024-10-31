import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

import EmailServices from "../../Services/Emails.Services";

const initialState = {
    Emails: [],
    SendEmails: []
};

export const SendEmail = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await EmailServices.SendEmail( data, token );
 
        if ( response.status === 200 ) {
            // toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
      
            // dispatch( collectEmail( response ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
        return response;
    } catch ( error ) {
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
        console.log( "Emails error===========>", error )
    };
};

export const GetEmail = ( id,token ) => async ( dispatch ) => {
    try {
        const response = await EmailServices.GetEmails( id,token );
       
        // dispatch( Mails( response ) );
        return response;
    } catch ( error ) {
        console.log( "Get Emails error===========>", error )
    };
};

export const GetSendEmail = ( id, token ) => async ( dispatch ) => {
    try {
        const response = await EmailServices.GetSendEmails( id, token );
        if ( response.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            // dispatch( GetMails( token ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
        return response;
    } catch ( error ) {
        console.log( "Get Send Emails error===========>", error )
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
    };
};



export const EmailSlice = createSlice( {
    name: "EmailSlice",
    initialState,
    reducers: {
        collectEmail: ( state, action ) => {
            state.Emails = action.payload
        },
        collectSendEmails: ( state, action ) => {
            state.SendEmails = action.payload
        },
    },
} );

export const {
    Mails,
    SingleMail,
} = EmailSlice.actions;

export default EmailSlice.reducer;