import { CONSTANTS } from "../../constants/constant";

const getCustomer = async (token) => {
    const onSuccess = (data) => {
        return data.data;
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.customer, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const AddCustomer = async (data, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.customer, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const DeleteCustomer = async (id, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.customer + '/' + id, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const SingleCustomer = async (profileId, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.customer + '/' + profileId + '/' + CONSTANTS.API_URLS.edit, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const UpdateCustomer = async (profileId, data, token) => {
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
        body: JSON.stringify(data),
    };
    
    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.customer + '/' + profileId, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const CustomerService = {
    UpdateCustomer,
    SingleCustomer,
    DeleteCustomer,
    AddCustomer,
    getCustomer,
};

export default CustomerService;