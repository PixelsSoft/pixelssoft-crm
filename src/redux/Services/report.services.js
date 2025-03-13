import { CONSTANTS } from "../../constants/constant";

// const getReport = async ( token, params ) => {
//     const onSuccess = ( data ) => {
//         return data;
//     };

//     const onFailure = error => {
//         throw error;
//     };

//     const options = {
//         method: 'GET',
//         headers: {

//             'Authorization': `Bearer ${token}`
//         },
//     };

//     return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.getReport, options )
//         .then( ( response ) => {
//             if ( !response.ok ) {
//                 return response.json().then( onFailure );
//             }
//             return response.json();
//         } )
//         .then( onSuccess )
//         .catch( onFailure )
// };
const getReport = async (token, params = {}) => {
    const { start_date = "", end_date = "" } = params; // Default values to empty strings

    const onSuccess = (data) => data;
    const onFailure = (error) => { throw error; };

    const queryParams = new URLSearchParams();
    if (start_date) queryParams.append("start_date", start_date);
    if (end_date) queryParams.append("end_date", end_date);

    const url = `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.getReport}${queryParams.toString() ? `?${queryParams}` : ''}`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch(url, options)
        .then((response) => response.ok ? response.json() : response.json().then(onFailure))
        .then(onSuccess)
        .catch(onFailure);
};





const ReportService = {
    getReport

};

export default ReportService;