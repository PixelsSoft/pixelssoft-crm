import { toast } from "react-toastify";
import LeadServices from "../../Services/lead.services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leads: [],
    singleLead: null
};

export const AddLead = (data, token, reset) => async (dispatch) => {
    try {
        const response = await LeadServices.AddLead(data, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            reset();
            dispatch(GetLead(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        console.log("AddLead error===========>", error)
    };
};

export const GetLead = (token) => async (dispatch) => {
    try {
        const response = await LeadServices.GetLead(token);
        dispatch(Leads(response));
        return response;
    } catch (error) {
        console.log("GetLead error===========>", error)
    };
};

export const DeleteLead = (leadId, token) => async (dispatch) => {
    try {
        const response = await LeadServices.DeleteLead(leadId, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetLead(token));
        } else {
            toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        console.log("DeleteLead error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const GetLeadById = (leadId, token) => async (dispatch) => {
    try {
        const response = await LeadServices.GetLeadById(leadId, token);
        if (response.status === 200) {
            dispatch(SingleLead(response.data));
        };
        return response;
    } catch (error) {
        console.log("GetLeadById error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const EditLead = (leadId, data, token) => async (dispatch) => {
    try {
        const response = await LeadServices.EditLead(leadId, data, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetLead(token));
        };
        return response;
    } catch (error) {
        console.log("EditLead error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const LeadSlice = createSlice({
    name: "LeadSlice",
    initialState,
    reducers: {
        Leads: (state, action) => {
            state.leads = action.payload
        },
        SingleLead: (state, action) => {
            state.singleLead = action.payload
        },
    },
});

export const {
    Leads,
    SingleLead,
} = LeadSlice.actions;

export default LeadSlice.reducer;