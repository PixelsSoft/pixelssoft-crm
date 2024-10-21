import { CONSTANTS } from "../../constants/constant";

const AddMail = async ( data, token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        headers: {
   
            'Authorization': `Bearer ${token}`
        },
        body: data,
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.UserMailAdd, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const GetMail = async ( token ) => {
    const onSuccess = ( { data } ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.UserMail, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const DeleteMail = async ( leadId, token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.UserMail +  leadId, options )
    .then( ( response ) => {
        if ( !response.ok ) {
            return response.json().then( onFailure );
        }
        return response.json();
    } )
    .then( onSuccess )
    .catch( onFailure )
};

const GetMailById = async ( leadId, token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.lead + '/' + leadId + '/' + CONSTANTS.API_URLS.edit, options )
        .then( response => response.json() )
        .then( onSuccess )
        .catch( onFailure )
};

const EditMail = async (id, data, token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data,
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.UserMail+id, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const UserMailServices = {
    EditMail,
    GetMailById,
    DeleteMail,
    GetMail,
    AddMail,
};

export default UserMailServices;