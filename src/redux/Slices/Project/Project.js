import { createSlice } from "@reduxjs/toolkit";
import ProjectService from "../../Services/Project.services";
import { toast } from "react-toastify";

const initialState = {
    project: [],
    proectById: null
}

export const CreateProject = (data, token) => async (dispatch) => {
    try {
        const response = await ProjectService.AddProject(data, token);
        if (response?.status === 409) {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        } else {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
        };
        dispatch(GetProject(token));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const GetProject = (token) => async (dispatch) => {
    try {
        const response = await ProjectService.GetProjects(token);
        dispatch(Projects(response));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const GetProjectById = (projectId, token) => async (dispatch) => {
    try {
        const response = await ProjectService.GetProjectById(projectId, token);
        dispatch(SingleProject(response));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const CreateMilestone = (projectId, data, token) => async (dispatch) => {
    try {
        const response = await ProjectService.CreateMilestone(projectId, data, token);
        console.log('response', response);
        dispatch(SingleProject(token));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const DeleteProject = (projectId, token) => async (dispatch) => {
    try {
        const response = await ProjectService.DeletProject(projectId, token);
        if (response?.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetProject(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const ProjectSlice = createSlice({
    name: "Projects",
    initialState,
    reducers: {
        Projects: (state, action) => {
            state.project = action.payload
        },
        SingleProject: (state, action) => {
            state.proectById = action.payload
        },
    },
});

export const {
    Projects,
    SingleProject
} = ProjectSlice.actions;

export default ProjectSlice.reducer;