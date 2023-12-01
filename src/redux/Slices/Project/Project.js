import { createSlice } from "@reduxjs/toolkit";
import ProjectService from "../../Services/Project.services";
import { toast } from "react-toastify";

const initialState = {
    project: [],
}

export const CreateProject = (data, token) => async (dispatch) => {
    try {
        const response = await ProjectService.AddProject(data, token);
        toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
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

export const ProjectSlice = createSlice({
    name: "Projects",
    initialState,
    reducers: {
        Projects: (state, action) => {
            state.project = action.payload
        },
    },
});

export const {
    Projects
} = ProjectSlice.actions;

export default ProjectSlice.reducer;