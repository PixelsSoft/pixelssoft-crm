import { CONSTANTS } from "../../constants/constant";

const AddExpenseCategory = async (data, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expenseCategory, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const GetExpenseCategory = async (token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expenseCategory, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const DeleteExpenseCategory = async (leadId, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expenseCategory + '/' + leadId, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const EditExpenseCategory = async (catId, data, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expenseCategory + '/' + catId, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const ExpenseCategoryServices = {
    EditExpenseCategory,
    DeleteExpenseCategory,
    GetExpenseCategory,
    AddExpenseCategory,
};

export default ExpenseCategoryServices;