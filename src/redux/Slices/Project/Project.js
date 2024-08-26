import { createSlice } from "@reduxjs/toolkit";
import ProjectService from "../../Services/Project.services";
import { toast } from "react-toastify";

const initialState = {
    project: [],
    proectById: null,
    singleMile: null
}

export const CreateProject = ( data, token, reset ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.AddProject( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            reset();
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };
        dispatch( GetProject( token ) );
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};
export const CreateBoard = ( data, token, reset ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.AddBoard( data, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            reset();
            dispatch( GetProject( token ) );
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
        console.log( "error===========>", error )
    };
};

export const GetProjectById = ( projectId, token ) => async ( dispatch ) => {
    try {
        if ( projectId ) {
            const response = await ProjectService.GetProjectById( projectId, token );
            dispatch( SingleProject( response ) );
        }
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};



export const DeleteProject = ( projectId, token, navigate, lead ) => async ( dispatch ) => {
    try {
        const response = await ProjectService.DeletProject( projectId, token );
        if ( response?.status === 200 ) {
            
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            if ( lead === 1 ) {
                navigate( '/apps/leadProjects' );
            } else {
                navigate( 'apps/projects/list' );
            }
            dispatch( GetProject( token ) );
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
    },
} );

export const {
    Projects,
    SingleProject,
    SingleMilestone,
} = ProjectSlice.actions;

export default ProjectSlice.reducer;