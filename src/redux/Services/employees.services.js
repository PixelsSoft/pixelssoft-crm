import { CONSTANTS } from "../../constants/constant";

const AddEmployee = async (params, token) => {
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
        body: params
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ADD_Employeee, options)
        .then(response => {
            console.log('response', response);
            return response.json();
        })
        .then(onSuccess)
        .catch(onFailure)
    // return axios
    //     .post( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN, { params: { params } } )
    //     .then( ( response ) => {
    //         console.log( "response", response )
    //         onSuccess( response )
    //     } )
    //     .catch( onFailure );
};

const getEmployeeRoles = async (token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.role, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const getEmployee = async (token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.getEmployee, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const DelteEmployee = async (id, token) => {
    const onSuccess = (data) => {
        return data.data;
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.deleteEmployee + id, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const GetEmployeeId = async (id, token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.getEmployee + '/' + id, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const EmployeeService = {
    GetEmployeeId,
    DelteEmployee,
    getEmployee,
    getEmployeeRoles,
    AddEmployee,
};

export default EmployeeService;