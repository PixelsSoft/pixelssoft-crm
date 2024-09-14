import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import CategoryService from "../../Services/category.services";

const initialState = {
    category: []
}

export const GetCategory = ( token ) => async ( dispatch ) => {
    try {
        const response = await CategoryService.getCategory( token );
        dispatch( Category( response ) );
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const AddnewCategory = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await CategoryService.createCategory( data, token );
        if ( response.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            await dispatch( GetCategory( token ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        console.log( "AddnewCategory error===========>", error )
    };
};

export const UpdateCategory = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await CategoryService.UpdateCategory( data, token );
        if ( response.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );

            dispatch( GetCategory( token ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        console.log( "AddnewCategory error===========>", error )
    };
};

export const DeleteCategory = ( id, token ) => async ( dispatch ) => {
    try {
        const response = await CategoryService.DeleteCategory( id, token );
        if ( response.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );

            dispatch( GetCategory( token ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        console.log( "AddnewCategory error===========>", error )
    };
};

export const CategorySlice = createSlice( {
    name: "Category",
    initialState,
    reducers: {
        Category: ( state, action ) => {
            state.category = action.payload
        },
    },
} );

export const {
    Category
} = CategorySlice.actions;

export default CategorySlice.reducer;