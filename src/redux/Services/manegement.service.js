import { CONSTANTS } from "../../constants/constant";
import { store } from '../store';

const addProjectCategory = ( params ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
            Authorization: store.getState().Auth.token,
        },
        body: JSON.stringify( params )
    };

    return fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ADD_Employeee, options )
        .then( response => response.json() )
        .then( onSuccess
        ).catch( onFailure )
};


const ManagementService = {
    addProjectCategory,
};
export default ManagementService;