import { CONSTANTS } from "../../constants/constant";

const CreateVendorCategoryServices = async (data, token) => {
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            // 'Accept': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body: data,
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendorCategory, options)
    .then( ( response ) => {
        if ( !response.ok ) {
            return response.json().then( onFailure );
        }
        return response.json();
    } )
    .then( onSuccess )
    .catch( onFailure );
};

const GetVendorCategoryServices = async (token) => {
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'GET',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            // 'Accept': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
     
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendorCategory, options)
    .then( ( response ) => {
        if ( !response.ok ) {
            return response.json().then( onFailure );
        }
        return response.json();
    } )
    .then( onSuccess )
    .catch( onFailure );
};

const DeleteCategoryServices = async (id, token) => {
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendorCategory + '/' + id, options)
    .then( ( response ) => {
        if ( !response.ok ) {
            return response.json().then( onFailure );
        }
        return response.json();
    } )
    .then( onSuccess )
    .catch( onFailure );
};

const UpdateVenCat = async ( data, token) => {
    const onSuccess = (data) => {
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
        body: data
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendorCategory , options)
    .then( ( response ) => {
        if ( !response.ok ) {
            return response.json().then( onFailure );
        }
        return response.json();
    } )
    .then( onSuccess )
    .catch( onFailure );
};

const VendorCategoryServices = {
    UpdateVenCat,
    DeleteCategoryServices,
    GetVendorCategoryServices,
    CreateVendorCategoryServices,
};

export default VendorCategoryServices;