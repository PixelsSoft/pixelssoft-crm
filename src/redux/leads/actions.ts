import { LeadsActionTypes } from './constants';

type LeadsActionType = {
    type:
        | LeadsActionTypes.API_RESPONSE_ERROR
        | LeadsActionTypes.API_RESPONSE_SUCCESS
        | LeadsActionTypes.CREATE_NEW_LEAD
        | LeadsActionTypes.GET_ALL_LEADS
        | LeadsActionTypes.DELETE_LEAD
        | LeadsActionTypes.RESET_LEADS
        | LeadsActionTypes.UPDATE_COMMENTS
        | LeadsActionTypes.UPDATE_STATUS;

    payload: {} | string;
};

type Lead = {
    name: string;
    email: string;
    phone?: string;
    status: 'Not Responded' | 'Responded';
    comments?: string;
};

export const LeadsApiResponseSuccess = (actionType: string, data: Lead[] | Lead | null): LeadsActionType => ({
    type: LeadsActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const LeadsApiResponseError = (actionType: string, error: string): LeadsActionType => ({
    type: LeadsActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const createNewLead = (data: Lead): LeadsActionType => ({
    type: LeadsActionTypes.CREATE_NEW_LEAD,
    payload: data,
});

export const getAllLeads = (): LeadsActionType => ({
    type: LeadsActionTypes.GET_ALL_LEADS,
    payload: {},
});

export const deleteLead = (id: string): LeadsActionType => ({
    type: LeadsActionTypes.DELETE_LEAD,
    payload: id,
});

export const updateComment = (id: string, comment: string): LeadsActionType => ({
    type: LeadsActionTypes.UPDATE_COMMENTS,
    payload: { id, comment },
});

export const updateStatus = (id: string, status: 'Responded' | 'Not Responded' | ''): LeadsActionType => ({
    type: LeadsActionTypes.UPDATE_STATUS,
    payload: { id, status },
});
