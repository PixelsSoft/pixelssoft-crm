import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import ProtalProjectService from "../../Services/PortalProject.services";

const initialState = {
    project: [],
    proectById: null,
    milestones: []
}

export const CreatePortalProject = ( data, token, reset ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.AddProject( data, token );
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( GetPortalProject( token ) );
            reset();
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
            console.warn( "error", response )
        };

    } catch ( error ) {
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
        console.log( "error===========>", error )
    };
};

export const GetPortalProject = ( token ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.GetProjects( token );
        if ( response.status === 200 ) {
            // toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( Projects( response?.data ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };

    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const GetPortalProjectById = ( projectId, token ) => async ( dispatch ) => {
    try {
        if ( projectId ) {
            const response = await ProtalProjectService.GetProjectById( projectId, token );
            dispatch( SingleProject( response ) );
        }
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const CreateMilestone = ( projectId, data, token, toggleModal ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.CreateMilestone( projectId, data, token );
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            toggleModal();
            dispatch( GetPortalProjectById( projectId, token ) )
            dispatch( GetMilestone( projectId, token ) )
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const DeleMilestone = ( id, projectId, token ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.DeleteMilestone( id, projectId, token );
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( GetPortalProjectById( projectId, token ) )
            dispatch( GetMilestone( projectId, token ) )
        } else {
            toast.error( response?.error?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
        console.log( "error===========>", error )
    };
};
export const CancelMilestone = ( id, projectId, token ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.CancelMilestone( id, projectId, token );
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( GetPortalProjectById( projectId, token ) )
            dispatch( GetMilestone( projectId, token ) )
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
        // console.log( "error===========>", error )
    };
};
export const ReleaseMilestone = ( id, projectId, token ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.ReleaseMilestone( id, projectId, token );

        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( GetPortalProjectById( projectId, token ) )
            dispatch( GetMilestone( projectId, token ) )
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
        console.log( "error===========>", error )
    };
};


export const GetMilestone = ( projectId, token ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.GetMilestones( projectId, token );
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            dispatch( Milestones( response?.data ) );
        } else {
            toast.error( response?.message, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        toast.error( error, { position: toast.POSITION.TOP_RIGHT } );
        console.log( "error===========>", error )
    };
};


export const GetMilestoneById = ( projectId, token ) => async ( dispatch ) => {
    try {
        if ( projectId ) {
            const response = await ProtalProjectService.GetMileById( projectId, token );
            if ( response.status === 200 ) {
                // dispatch( SingleMilestone( response?.data ) );
            };
        }
    } catch ( error ) {
        console.log( "error===========>", error )
        toast.error( error, { position: toast.POSITION.TOP_RIGHT } );
    };
};

export const UpdateMilstone = ( projectId, formData, token, toggleEditModal ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.UpdateMile( formData, token );
        console.log( "response", response )
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            toggleEditModal();
            dispatch( GetPortalProjectById( projectId, token ) )
            dispatch( GetMilestone( projectId, token ) )
        } else {
            toggleEditModal();
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        toast.error( error?.detail, { position: toast.POSITION.TOP_RIGHT } );
        toggleEditModal();
        // console.log( "error===========>", error )
    };
};

export const DeletePortalProject = ( projectId, token, navigate, lead ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.DeletProject( projectId, token );
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            if ( lead === 1 ) {
                navigate( '/apps/leadProjects' );
            } else {
                navigate( '/apps/portalProjects' );
            }
            dispatch( GetPortalProject( token ) );
        } else {
            toast.error( response?.detail, { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const UpdateProject = ( projectId, data, token, toggleEditModal ) => async ( dispatch ) => {
    try {
        const response = await ProtalProjectService.UpdateProject( projectId, data, token );
        if ( response?.status === 200 ) {
            toast.success( response?.message, { position: toast.POSITION.TOP_RIGHT } );
            toggleEditModal();
            dispatch( GetPortalProject( token ) );
        } else {
            toast.error( response?.message[0], { position: toast.POSITION.TOP_RIGHT } );
        };
    } catch ( error ) {
        console.log( "error===========>", error )
    };
};

export const ProjectSlice = createSlice( {
    name: "PortalProjects",
    initialState,
    reducers: {
        Projects: ( state, action ) => {
            state.project = action.payload
        },
        SingleProject: ( state, action ) => {
            state.proectById = action.payload
        },
        Milestones: ( state, action ) => {
            state.milestones = action.payload
        },
    },
} );

export const {
    Projects,
    SingleProject,
    Milestones,
} = ProjectSlice.actions;

export default ProjectSlice.reducer;