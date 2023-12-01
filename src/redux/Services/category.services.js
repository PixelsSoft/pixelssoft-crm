import { CONSTANTS } from "../../constants/constant";

const getCategory = async (token) => {
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

    return await fetch(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.getCategory, options)
        .then(response => response.json())
        .then(onSuccess)
        .catch(onFailure)
};

const CategoryService = {
    getCategory,
};

export default CategoryService;