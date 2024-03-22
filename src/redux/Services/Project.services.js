import axios from "axios";
import { CONSTANTS } from "../../constants/constant";

const AddProject = async ( data, token ) => {
    for ( var pair of data.entries() ) {
        console.log( pair[0] + ', ' + pair[1] );
    }
    const onSuccess = ( data ) => {
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
        body: data,
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.project, options )
        .then( response => response.json() )
        .then( onSuccess )
        .catch( onFailure )
};

const GetProjects = async ( token ) => {
    const onSuccess = ( data ) => {
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

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.project, options )
        .then( response => response.json() )
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
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.project + '/' + projectId + '/' + CONSTANTS.API_URLS.edit, options )
        .then( response => response.json() )
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
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify( data )
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.projectMilestone + projectId, options )
        .then( response => response.json() )
        .then( onSuccess )
        .catch( onFailure )
};

const DeleteMilestone = async ( id, token ) => {
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.milestone + '/' + id, options )
        .then( response => response.json() )
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
        .then( response => response.json() )
        .then( onSuccess )
        .catch( onFailure )
};

const UpdateMile = async ( projectId, data, token ) => {
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

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.milestone + '/' + projectId, options )
        .then( response => response.json() )
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
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.project + '/' + projectId, options )
        .then( response => response.json() )
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

const ProjectService = {
    UpdateProject,
    DeletProject,
    UpdateMile,
    GetMileById,
    DeleteMilestone,
    CreateMilestone,
    GetProjectById,
    GetProjects,
    AddProject,
};

export default ProjectService; 