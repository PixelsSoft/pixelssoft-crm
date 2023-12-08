import { CONSTANTS } from "../../constants/constant";

const getRoles = (token) => {
    const onSuccess = (data) => {
        return data?.data;
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

    return fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.role, options)
        .then(response => {
            return response.json()
        })
        .then(onSuccess())
        .catch(error => onFailure(error));
};

const newRole = (data, token) => {
    const onSuccess = (data) => {
        return data?.data;
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

    return fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.role, options)
        .then(response => {
            return response.json()
        })
        .then(onSuccess())
        .catch(error => onFailure(error));
};

const updateRole = (id, data, token) => {
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

    return fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.role + '/' + id, options)
        .then(response => {
            return response.json()
        })
        .then(onSuccess())
        .catch(error => onFailure(error));
};

const DeleteRole = (id, token) => {
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

    return fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.role + '/' + id, options)
        .then(response => {
            return response.json()
        })
        .then(onSuccess())
        .catch(error => onFailure(error));
};

const RolesServices = {
    DeleteRole,
    updateRole,
    newRole,
    getRoles,
};

export default RolesServices;