import { CONSTANTS } from "../../constants/constant";

const AddExpense = async (data, token) => {
    console.log('AddExpense', data, token)
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body: data,
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expense, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const GetExpense = async (token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expense, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const DeleteExpense = async (exId, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expense + '/' + exId, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};


const GetExpenseById = async (exId, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expense + '/' + exId + '/' + CONSTANTS.API_URLS.edit, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const EditExpense = async (exId, data, token) => {
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const options = {
        method: 'POST',
        headers: myHeaders,
        body: data,
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expense + '/' + exId, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const ExpenseServices = {
    EditExpense,
    GetExpenseById,
    DeleteExpense,
    GetExpense,
    AddExpense,
};

export default ExpenseServices;