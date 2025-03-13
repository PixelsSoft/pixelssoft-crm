import { CONSTANTS } from "../../constants/constant";

const getTarget = async ( token ) => {
    const onSuccess = ( data ) => {
        return data.data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'GET',
        headers: {

            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.target, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const getSingleTarget = async ( id,token , month) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'GET',
        headers: {

            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.target+id+"/monthly/"+month, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};




const TargetService = {
    getTarget,
    getSingleTarget,

};

export default TargetService;