import { CONSTANTS } from "../../constants/constant";

const getTracking = async (token, params = {}) => {
    const onSuccess = (data) => data.data;

    const onFailure = (error) => {
        throw error;
    };

    // Construct query string from params
    const queryString = new URLSearchParams(params).toString();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    const url = `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.Gettarget}?${queryString}`;

    return await fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                return response.json().then(onFailure);
            }
            return response.json();
        })
        .then(onSuccess)
        .catch(onFailure);
};




const TrackingService = {
    getTracking

};

export default TrackingService;