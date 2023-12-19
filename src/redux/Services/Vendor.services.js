import { CONSTANTS } from "../../constants/constant";

const CreateVendorServices = async (data, token) => {
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendor, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const GetVendors = async (token) => {
    const onSuccess = ({ data }) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendor, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const UpdateVendor = async (id, data, token) => {
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendor + '/' + id, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const DeleteCategory = async (id, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendor + '/' + id, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const VendorServices = {
    DeleteCategory,
    UpdateVendor,
    GetVendors,
    CreateVendorServices,
};

export default VendorServices;