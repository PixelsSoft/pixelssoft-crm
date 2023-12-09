import { CONSTANTS } from "../../constants/constant";

const AddLead = async (data, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.lead, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const GetLead = async (token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.lead, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const DeleteLead = async (leadId, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.lead + '/' + leadId, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const GetLeadById = async (leadId, token) => {
    const onSuccess = (data) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.lead + '/' + leadId + '/' + CONSTANTS.API_URLS.edit, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const EditLead = async (leadId, data, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.lead + '/' + leadId, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const LeadServices = {
    EditLead,
    GetLeadById,
    DeleteLead,
    GetLead,
    AddLead,
};

export default LeadServices;