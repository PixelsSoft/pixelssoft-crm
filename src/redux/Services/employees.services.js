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
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        // body: params
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.role, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)

    // return await fetch('https://crmupd.pixelssoft.com/api/role', options)
    // .then(response => response.json())
    // .then(onSuccess)
    // .catch(onFailure)
};

const EmployeeService = {
    getEmployeeRoles,
    AddEmployee,
};

export default EmployeeService;