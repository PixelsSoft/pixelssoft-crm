import { CONSTANTS } from "../../constants/constant";

const getCards = async (token) => {
    const onSuccess = (data) => {
        return data.data;
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.card, options)
    .then( ( response ) => {
        if ( !response.ok ) {
            return response.json().then( onFailure );
        }
        return response.json();
    } )
    .then( onSuccess )
    .catch( onFailure );
};


const CardService = {
    getCards,

};

export default CardService;