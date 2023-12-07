import { createSlice } from "@reduxjs/toolkit";
import RolesServices from "../../Services/roles.services";
import { toast } from "react-toastify";

const initialState = {
    roles: [],
};

export const getRoles = ( token ) => async ( dispatch ) => {
    try {
        const response = await RolesServices.getRoles( token );
        dispatch( userRoles( response.data ) );
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const CreateNewRole = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await RolesServices.newRole( data, token );
        dispatch( getRoles() );
        toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
    } catch ( error ) {
        console.log( "CreateNewRole error===========>", error )
    };
};

export const UpdateRole = ( id, data, token ) => async ( dispatch ) => {
    try {
        const response = await RolesServices.updateRole( id, data, token );
        dispatch( getRoles() );
        toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
    } catch ( error ) {
        console.log( "CreateNewRole error===========>", error )
    };
};

export const AuthSlice = createSlice( {
    name: "Auth",
    initialState,
    reducers: {
        userRoles: ( state, action ) => {
            state.roles = action.payload
        },
    },
} );

export const {
    userRoles,
} = AuthSlice.actions;

export default AuthSlice.reducer;