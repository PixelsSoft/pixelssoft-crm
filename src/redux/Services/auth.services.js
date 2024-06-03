import { CONSTANTS } from "../../constants/constant";

const login = ( { email, password } ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };


    const formdata = new FormData();
    formdata.append( "email", email );
    formdata.append( "password", password );
    const options = {
        method: 'POST',
        body: formdata,
        headers: {
            'Accept': 'application/json'
        },
    };

    return fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure );
};
const getProfile = ( token ) => {
    console.log( "token", token );
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'GET',

        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
    };

    return fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.PROFILE, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure );
};

const authService = {
    login,
    getProfile
};

export default authService;