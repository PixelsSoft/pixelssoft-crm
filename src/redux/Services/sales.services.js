import { CONSTANTS } from "../../constants/constant";

const getSales = (token,selectedDate) => {
   
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
    if (selectedDate!==undefined){
        return fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.SALES+"?month="+selectedDate, options)
        .then(response => {
            return response.json()
        })
        .then(onSuccess())
        .catch(error => onFailure(error));
    }
    else{
        return fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.SALES, options)
        .then(response => {
            return response.json()
        })
        .then(onSuccess())
        .catch(error => onFailure(error));
    }

   
};

const SalesServices = {
    getSales
};

export default SalesServices;