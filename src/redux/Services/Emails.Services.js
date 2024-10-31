import { CONSTANTS } from "../../constants/constant";

const GetEmails= async (id, token) => {
   
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'GET',
        headers: {
         
            'Authorization': `Bearer ${token}`
        },
   
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GetEmail+id, options)
    .then( ( response ) => {
        if ( !response.ok ) {
            return response.json().then( onFailure );
        }
        return response.json();
    } )
    .then( onSuccess )
    .catch( onFailure );
};

const GetSendEmails = async (id,token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GetSendEmail+id, options)
    .then( ( response ) => {
        if ( !response.ok ) {
            return response.json().then( onFailure );
        }
        return response.json();
    } )
    .then( onSuccess )
    .catch( onFailure );
};

const SendEmail = async (exId, token) => {
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
    };

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.SendEmail  + exId, options)
    .then( ( response ) => {
        if ( !response.ok ) {
            return response.json().then( onFailure );
        }
        return response.json();
    } )
    .then( onSuccess )
    .catch( onFailure );
};


const EmailServices = {
    SendEmail,
    GetSendEmails,
    GetEmails,
  
};

export default EmailServices;