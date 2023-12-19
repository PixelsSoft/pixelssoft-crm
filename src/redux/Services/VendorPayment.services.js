import { CONSTANTS } from "../../constants/constant";

const CreateVendorPayment = async (data, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendorPayment, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const GetVendorPayments = async (token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendorPayment, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const DeleteVendorPayment = async (id, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendorPayment + '/' + id, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const GetVendorPaymentById = async (id, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendorPayment + '/' + id + '/' + CONSTANTS.API_URLS.edit, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const UpdateVendorPayment = async (id, data, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.vendorPayment + '/' + id, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const VendorPaymentServices = {
    UpdateVendorPayment,
    GetVendorPaymentById,
    DeleteVendorPayment,
    GetVendorPayments,
    CreateVendorPayment,
};

export default VendorPaymentServices;