import { CONSTANTS } from "../../constants/constant";

const addEmployee = ( params ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify( params )
    };

    return fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ADD_Employeee, options )
        .then( response => response.json() )
        .then( onSuccess
        ).catch( onFailure )
    // return axios
    //     .post( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN, { params: { params } } )
    //     .then( ( response ) => {
    //         console.log( "response", response )
    //         onSuccess( response )
    //     } )
    //     .catch( onFailure );
};


const EmployeeService = {
    addEmployee,
};
export default EmployeeService;