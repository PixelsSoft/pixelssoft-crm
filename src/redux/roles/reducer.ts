import { RoleActionTypes } from './constants';

export type Role = {
    _id: string;
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

export type ActionTypes = {
    type:
        | RoleActionTypes.API_RESPONSE_SUCCESS
        | RoleActionTypes.API_RESPONSE_ERROR
        | RoleActionTypes.CREATE_ROLE
        | RoleActionTypes.DELETE_ROLE
        | RoleActionTypes.GET_ALL_ROLES
        | RoleActionTypes.RESET_CREATE_ROLE
        | RoleActionTypes.RESET_ROLES;
    payload: {
        actionType?: string;
        data?: {};
        error?: string;
    };
};

export type State = {
    loading: boolean;
    roles: Role[] | [] | null;
};

const INIT_STATE: State = {
    loading: false,
    roles: [],
};

const Roles = (state = INIT_STATE, action: ActionTypes): any => {
    switch (action.type) {
        case RoleActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case RoleActionTypes.CREATE_ROLE: {
                    return {
                        ...state,
                        loading: false,
                        createRoleSuccess: true,
                        data: action.payload.data,
                        error: null,
                    };
                }

                case RoleActionTypes.GET_ALL_ROLES: {
                    return {
                        ...state,
                        loading: false,
                        roles: action.payload.data,
                    };
                }

                case RoleActionTypes.DELETE_ROLE: {
                    return {
                        ...state,
                        loading: false,
                        deleteRoleSuccess: true,
                    };
                }

                default:
                    return { ...state };
            }

        case RoleActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case RoleActionTypes.CREATE_ROLE: {
                    return {
                        ...state,
                        loading: false,
                        createRoleSuccess: false,
                        data: null,
                        error: action.payload.error,
                    };
                }

                case RoleActionTypes.GET_ALL_ROLES: {
                    return {
                        ...state,
                        loading: false,
                        roles: null,
                        error: action.payload.error,
                    };
                }

                case RoleActionTypes.DELETE_ROLE: {
                    return {
                        ...state,
                        loading: false,
                        deleteRoleSuccess: false,
                        error: action.payload.error,
                    };
                }
                default:
                    return { ...state };
            }

        case RoleActionTypes.RESET_CREATE_ROLE: {
            return {
                ...state,
                data: null,
                error: null,
            };
        }

        case RoleActionTypes.RESET_ROLES:
            return {
                ...state,
                loading: false,
                deleteRoleSuccess: false,
                createRoleSuccess: false,
                roles: null,
                error: null,
            };

        default:
            return { ...state };
    }
};

export default Roles;
