import { CONSTANTS } from "../../constants/constant";

const PerMonthAttendance = ( token ) => {
    const onSuccess = ( data ) => {
        return data;
    };
    const onFailure = error => {
        throw error;
    };
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
    };

    return fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.attendancePerMonth, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure );
};


const attendancerServies = {
    PerMonthAttendance,

};

export default attendancerServies;