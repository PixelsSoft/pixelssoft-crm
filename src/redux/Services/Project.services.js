
import { CONSTANTS } from "../../constants/constant";

const AddProject = async ( data, token ) => {
    // for ( var pair of data.entries() ) {
    //     console.log( pair[0] + ', ' + pair[1] );
    // }
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
        body: data,
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.Createproject, options )
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

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.project, options )
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

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.project + '/' + projectId, options )
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
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.project + '/' + projectId, options )
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

const AddBoard = async ( data, token ) => {
    // for ( var pair of data.entries() ) {
    //     console.log( pair[0] + ', ' + pair[1] );
    // }
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
        body: data,
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.CreateBoard, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const EditBoard = async ( data, token ) => {
    // for ( var pair of data.entries() ) {
    //     console.log( pair[0] + ', ' + pair[1] );
    // }
    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data,
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.EditBoard, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const DeleteBoard = async ( token, id ) => {
    // for ( var pair of data.entries() ) {
    //     console.log( pair[0] + ', ' + pair[1] );
    // }
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

        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.DeleteBoard + id, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const GetBoard = async ( id, token ) => {

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

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GetBoard + id, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const AddTask = async ( data, token ) => {

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
        body: data,
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.task, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const EditTask = async ( data, token ) => {

    const onSuccess = ( data ) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    const options = {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data,
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.task, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};

const DeleteTask = async ( token, id ) => {

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

        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.task + "/" + id, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const DropTask = async ( data, token ) => {

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
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.Droptask, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const UploadProjectDocuments = async ( data, token ) => {

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
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.uploadDoc, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const EditProjectById = async ( data, token ) => {

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
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.editProject, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const GetComments = async ( id, token ) => {

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

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.sendComments + "/" + id, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const SendComments = async ( data, token ) => {

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
        redirect: "follow"
    };

    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.sendComments, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const SendCommentReply = async ( data, token ) => {

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
        redirect: "follow"
    };
    return await fetch( CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.sendCommentsReply, options )
        .then( ( response ) => {
            if ( !response.ok ) {
                return response.json().then( onFailure );
            }
            return response.json();
        } )
        .then( onSuccess )
        .catch( onFailure )
};
const ProjectService = {
    UpdateProject,
    DeletProject,
    AddBoard,
    GetProjectById,
    GetProjects,
    AddProject,
    GetBoard,
    AddTask,
    DeleteBoard,
    EditBoard,
    DeleteTask,
    EditTask,
    DropTask,
    UploadProjectDocuments,
    EditProjectById,
    GetComments,
    SendComments,
    SendCommentReply

};

export default ProjectService; 