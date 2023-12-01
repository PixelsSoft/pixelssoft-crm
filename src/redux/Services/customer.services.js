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
        body: JSON.stringify(data),
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.customer, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const CustomerService = {
    AddCustomer,
    getCustomer,
};

export default CustomerService;