import { createSlice } from "@reduxjs/toolkit";
import ProjectService from "../../Services/Project.services";
import { toast } from "react-toastify";

const initialState = {
    project: [],
    proectById: null,
    singleMile: null,
    commnents: [],
    Boards: []
}

export const CreateProject = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.AddProject( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );

        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
        dispatch( GetProject( token ) );
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const GetProject = ( token ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.GetProjects( token );

        dispatch( Projects( response?.data ) );
    } catch ( error ) {
        console.log( "error geting project===========>", error )
    };
};

export const GetProjectById = ( projectId, token ) => async ( dispatch ) => {
    try {
        if ( projectId ) {
            const response = await ProjectService.GetProjectById( projectId, token );

            dispatch( SingleProject( response?.data ) );
            dispatch( GetComments( projectId, token ) )

            return response
        }
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const EditProjectById = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.EditProjectById( data, token );
        dispatch( GetProject( token ) );

        return response

    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const DeleteProject = ( projectId, token, navigate, lead ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.DeletProject( projectId, token );

        if ( response?.status === 200 ) {
            dispatch( GetProject( token ) );

            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            if ( lead === 1 ) {
                navigate( '/apps/leadProjects' );
            }
            // dispatch( GetProject( token ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };

    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const UpdateProject = ( projectId, data, token, toggleEditModal ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.UpdateProject( projectId, data, token );
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            toggleEditModal();
            dispatch( GetProject( token ) );
        } else {
            toast.error( response?.message[0], { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const CreateBoard = ( data, token, id ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.AddBoard( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
        await dispatch( GetBoard( id, token ) )
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const EditBoard = ( data, token, id ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.EditBoard( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
        await dispatch( GetBoard( id, token ) )
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const DeleteBoard = ( token, id, projectId ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.DeleteBoard( token, id );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
        await dispatch( GetBoard( projectId, token ) )
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const GetBoard = ( projectId, token ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.GetBoard( projectId, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );

            dispatch( boards( response?.data ) );


        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };

    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const CreateTask = ( data, token, id ) => async ( dispatch ) => {

    try {
        const response = await ProjectService.AddTask( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
        dispatch( GetBoard( id, token ) );
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const EditTask = ( data, token, id ) => async ( dispatch ) => {

    try {
        const response = await ProjectService.EditTask( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
        dispatch( GetBoard( id, token ) );
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const DeleteTask = ( token, id, projectId ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.DeleteTask( token, id );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
        dispatch( GetBoard( projectId, token ) );
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const DropTask = ( data, token, projectId ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.DropTask( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
        dispatch( GetBoard( projectId, token ) );
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const UploadProjectDocuments = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.UploadProjectDocuments( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );

        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const addTeamMembers = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.AddTeamMembers( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );

        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const removeTeamMember = ( data, token ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.RemoveTeamMember( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );

        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};



export const GetComments = ( id, token ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.GetComments( id, token );
        dispatch( saveCommnents( response?.data ) )
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );

        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const SendComments = ( data, token, id ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.SendComments( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( GetComments( id, token ) )

        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const SendCommentsReply = ( data, token, id ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.SendCommentReply( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( GetComments( id, token ) )

        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const ProjectSlice = createSlice( {
    name: "Projects",
    initialState,
    reducers: {
        Projects: ( state, action ) => {
            state.project = action.payload
        },
        SingleProject: ( state, action ) => {
            state.proectById = action.payload
        },
        SingleMilestone: ( state, action ) => {
            state.singleMile = action.payload
        },
        boards: ( state, action ) => {
            state.Boards = action.payload
        },
        saveCommnents: ( state, action ) => {
            state.commnents = action.payload
        },
    },
} );

export const {
    Projects,
    SingleProject,
    SingleMilestone,
    boards,
    saveCommnents
} = ProjectSlice.actions;

export default ProjectSlice.reducer;