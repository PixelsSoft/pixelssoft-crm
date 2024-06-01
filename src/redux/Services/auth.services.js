import { CONSTANTS } from "../../constants/constant";

const login = ( params ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN, options )
        .then( response => {
            return response.json();
        } )
        .then( onSuccess() )
        .catch( error => onFailure( error ) );
};

const authService = {
    login,
};

export default authService;