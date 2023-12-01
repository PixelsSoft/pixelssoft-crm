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
        return data.data;
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

const InvoiceService = {
    CreateInvoice,
    getInvoices,
};

export default InvoiceService;