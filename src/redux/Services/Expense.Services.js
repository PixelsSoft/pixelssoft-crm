import { CONSTANTS } from "../../constants/constant";

const AddExpense = async (data, token) => {
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

// const DeleteExpenseCategory = async (leadId, token) => {
//     const onSuccess = (data) => {
//         return data;
//     };

//     const onFailure = error => {
//         throw error;
//     };

//     const options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//     };

//     return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expenseCategory + '/' + leadId, options)
//         .then(response => response.json())
//         .then(onSuccess)
//         .catch(onFailure)
// };

// const EditExpenseCategory = async (catId, data, token) => {
//     const onSuccess = (data) => {
//         return data;
//     };

//     const onFailure = error => {
//         throw error;
//     };

//     const options = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(data),
//     };

//     return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.expenseCategory + '/' + catId, options)
//         .then(response => response.json())
//         .then(onSuccess)
//         .catch(onFailure)
// };

const ExpenseServices = {
    // EditExpenseCategory,
    // DeleteExpenseCategory,
    GetExpense,
    AddExpense,
};

export default ExpenseServices;