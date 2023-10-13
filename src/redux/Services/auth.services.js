import axios from 'axios';
import { CONSTANTS } from '../../constants/constant';

const login = ( email, password ) => {
    const formData = new FormData();
    formData.append( 'email', email );
    formData.append( 'password', password );

    const onSuccess = ( { data } ) => {
        console.log( "data=====>", data )

        return data;
    };

    const onFailure = error => {
        console.log( "error=====>", error )

        throw error;
    };

    return axios
        .post( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN, formData )
        .then( onSuccess )
        .catch( onFailure );
};




const authService = {
    login,
};
export default authService;