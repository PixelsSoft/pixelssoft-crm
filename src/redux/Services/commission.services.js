import { CONSTANTS } from "../../constants/constant";

const getCommission = async ( token ,data) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        body: data,
        headers: {

            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.comission, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const getSingleCommission = async ( token ,id, data) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        body: data,
        headers: {

            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.comission+id, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};




const CommissionService = {
    getCommission,
    getSingleCommission,

};

export default CommissionService;