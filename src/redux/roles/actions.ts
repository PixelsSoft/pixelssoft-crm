import { RoleActionTypes } from './constants';

export type Role = {
    title: string;
    access: {
        all: boolean;
        allowDashboard: boolean;
        allowViewInvoices: boolean;
        allowCreateInvoices: boolean;
        allowViewCustomers: boolean;
        allowCreateCustomers: boolean;
        allowViewProjects: boolean;
        allowCreateProjects: boolean;
        allowSales: boolean;
        allowViewUsers: boolean;
        allowCreateUsers: boolean;
        allowReports: boolean;
        allowViewExpenses: boolean;
        allowCreateExpenses: boolean;
        allowPayouts: boolean;
        allowAttendance: boolean;
        allowLeads: boolean;
    };
};

type ActionObject = {
    type:
        | RoleActionTypes.API_RESPONSE_SUCCESS
        | RoleActionTypes.API_RESPONSE_ERROR
        | RoleActionTypes.CREATE_ROLE
        | RoleActionTypes.DELETE_ROLE
        | RoleActionTypes.GET_ALL_ROLES
        | RoleActionTypes.RESET_CREATE_ROLE
        | RoleActionTypes.RESET_ROLES;
    payload: {} | string;
};

export const rolesApiResponseSuccess = (actionType: string, data: Role | Role[] | {}): ActionObject => ({
    type: RoleActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const rolesApiResponseError = (actionType: string, error: string): ActionObject => ({
    type: RoleActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAllRoles = (): ActionObject => ({
    type: RoleActionTypes.GET_ALL_ROLES,
    payload: {},
});

export const createNewRole = (details: Role): ActionObject => ({
    type: RoleActionTypes.CREATE_ROLE,
    payload: details,
});

export const deleteRole = (id: string): ActionObject => ({
    type: RoleActionTypes.DELETE_ROLE,
    payload: id,
});

export const resetCreateRole = (): ActionObject => ({
    type: RoleActionTypes.RESET_CREATE_ROLE,
    payload: {},
});

export const resetRole = (): ActionObject => ({
    type: RoleActionTypes.RESET_ROLES,
    payload: {},
});
