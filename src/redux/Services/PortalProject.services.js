import axios from "axios";
import { CONSTANTS } from "../../constants/constant";

const AddProject = async ( data, token ) => {

    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data,
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.portal, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const GetProjects = async ( token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.portal, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const GetProjectById = async ( projectId, token ) => {
    const onSuccess = ( data ) => {
        return data.data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.portal + '/' + projectId, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const CreateMilestone = async ( projectId, data, token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        headers: {

            'Authorization': `Bearer ${token}`
        },
        body: data
    };
    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.milestone, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const GetMilestones = async ( projectId, token ) => {
    const onSuccess = ( data ) => {
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
    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.milestone + "/" + projectId, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const DeleteMilestone = async ( id, projectId, token ) => {
    const formdata = new FormData()
    formdata.append( "portal_project_id", projectId )

    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: formdata
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.milestone + '/' + id, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const CancelMilestone = async ( id, projectId, token ) => {
    const formdata = new FormData()
    formdata.append( "portal_project_id", projectId )

    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: formdata
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.milestone + '/cancel/' + id, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const ReleaseMilestone = async ( id, projectId, token ) => {
    const formdata = new FormData()
    formdata.append( "portal_project_id", projectId )

    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: formdata
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.milestone + '/release/' + id, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};


const GetMileById = async ( projectId, token ) => {
    const onSuccess = ( data ) => {
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

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.milestone + '/' + projectId + '/' + CONSTANTS.API_URLS.edit, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const UpdateMile = async ( data, token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'PUT',
        headers: {

            'Authorization': `Bearer ${token}`
        },
        body: data
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.milestone, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const DeletProject = async ( projectId, token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'DELETE',
        headers: {

            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.portal + '/' + projectId, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const UpdateProject = async ( projectId, data, token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify( data )
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.project + '/' + projectId, options )
        .then( response => response.json() )
        .then( onSuccess )
        .catch( onFailure )
};

const ProtalProjectService = {
    UpdateProject,
    DeletProject,
    UpdateMile,
    GetMileById,
    DeleteMilestone,
    CreateMilestone,
    GetProjectById,
    GetProjects,
    AddProject,
    GetMilestones,
    CancelMilestone,
    ReleaseMilestone
};

export default ProtalProjectService; 