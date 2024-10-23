import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import UserMailServices from "../../Services/UserMail.services";

const initialState = {
    Mails: [],
    singleMail: null
};

export const AddMail = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await UserMailServices.AddMail( data, token );
 
        if ( response.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
      
            dispatch( GetMails( token ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
        return response;
    } catch ( error ) {
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
        console.log( "AddLead error===========>", error )
    };
};

export const GetMails = ( token ) => async ( dispatch ) => {
    try {
        const response = await UserMailServices.GetMail( token );
       
        dispatch( Mails( response ) );
        return response;
    } catch ( error ) {
        console.log( "GetLead error===========>", error )
    };
};

export const DeleteMail = ( leadId, token ) => async ( dispatch ) => {
    try {
        const response = await UserMailServices.DeleteMail( leadId, token );
        if ( response.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( GetMails( token ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
        return response;
    } catch ( error ) {
        console.log( "DeleteLead error===========>", error )
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
    };
};

export const GetMailById = ( leadId, token ) => async ( dispatch ) => {
    try {
        const response = await UserMailServices.GetMailById( leadId, token );
        if ( response.status === 200 ) {
            dispatch( SingleMail( response.data ) );
        };
        return response;
    } catch ( error ) {
        console.log( "GetLeadById error===========>", error )
        toast.error( error, { position: toast.POSITION.TOP_RIGHT } );
    };
};
export const GetUserMail = ( leadId, token ) => async ( dispatch ) => {
    try {
        const response = await UserMailServices.GetMailById( leadId, token );
        if ( response.status === 200 ) {
            dispatch( Mails( response) );
        };
        return response;
    } catch ( error ) {
        console.log( "GetLeadById error===========>", error )
        toast.error( error, { position: toast.POSITION.TOP_RIGHT } );
    };
};

export const EditMail = (id, data, token ) => async ( dispatch ) => {
    try {
        const response = await UserMailServices.EditMail( id,data, token );
        if ( response.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( GetMails( token ) );
        };
        return response;
    } catch ( error ) {
        console.log( "EditLead error===========>", error )
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
    };
};

export const MailSlice = createSlice( {
    name: "MailSlice",
    initialState,
    reducers: {
        Mails: ( state, action ) => {
            state.Mails = action.payload
        },
        SingleMail: ( state, action ) => {
            state.singleMail = action.payload
        },
    },
} );

export const {
    Mails,
    SingleMail,
} = MailSlice.actions;

export default MailSlice.reducer;