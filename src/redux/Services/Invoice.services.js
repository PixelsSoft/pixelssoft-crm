import { CONSTANTS } from "../../constants/constant";

const getInvoices = async (token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.getInvoice, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const CreateInvoice = async (data, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.getInvoice, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const DeleteInvoice = async (projectId, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.getInvoice + '/' + projectId, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const GetInvoiceById = async (projectId, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.getInvoice + '/' + projectId + '/' + CONSTANTS.API_URLS.edit, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const UpdateInvoice = async (projectId, data, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.getInvoice + '/' + projectId, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const InvoiceService = {
    UpdateInvoice,
    GetInvoiceById,
    DeleteInvoice,
    CreateInvoice,
    getInvoices,
};

export default InvoiceService;