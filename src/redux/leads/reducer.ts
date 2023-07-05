import { LeadsActionTypes } from './constants';

export type ActionType = {
    type:
        | LeadsActionTypes.API_RESPONSE_SUCCESS
        | LeadsActionTypes.API_RESPONSE_ERROR
        | LeadsActionTypes.CREATE_NEW_LEAD
        | LeadsActionTypes.DELETE_LEAD
        | LeadsActionTypes.GET_ALL_LEADS
        | LeadsActionTypes.RESET_LEADS
        | LeadsActionTypes.UPDATE_COMMENTS
        | LeadsActionTypes.UPDATE_STATUS;
    payload: {
        actionType?: string;
        data?: {};
        error?: string;
    };
};

type Lead = {
    name: string;
    email: string;
    phone: string;
    status: 'Responded' | 'Not Responded';
    comments: string;
};

type State = {
    leads: Lead[] | Lead | null;
    loading: boolean;
};

const INIT_STATE: State = {
    leads: null,
    loading: false,
};

const Leads = (state = INIT_STATE, action: ActionType): any => {
    switch (action.type) {
        case LeadsActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case LeadsActionTypes.CREATE_NEW_LEAD: {
                    return {
                        ...state,
                        loading: false,
                        error: null,
                        createLeadSuccess: true,
                        data: action.payload.data,
                    };
                }

                case LeadsActionTypes.GET_ALL_LEADS: {
                    return {
                        ...state,
                        loading: false,
                        leads: action.payload.data,
                    };
                }

                case LeadsActionTypes.DELETE_LEAD: {
                    return {
                        ...state,
                        loading: false,
                        leadDeleteSuccess: true,
                    };
                }

                case LeadsActionTypes.UPDATE_COMMENTS: {
                    return {
                        ...state,
                        commentUpdated: true,
                        error: null,
                    };
                }

                default:
                    return { ...state };
            }

        case LeadsActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case LeadsActionTypes.CREATE_NEW_LEAD: {
                    return {
                        ...state,
                        loading: false,
                        createLeadSuccess: false,
                        error: action.payload.error,
                        data: null,
                    };
                }

                case LeadsActionTypes.GET_ALL_LEADS: {
                    return {
                        ...state,
                        loading: false,
                        leads: null,
                        error: action.payload.error,
                    };
                }

                case LeadsActionTypes.DELETE_LEAD: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        leadDeleteSuccess: false,
                    };
                }

                case LeadsActionTypes.UPDATE_COMMENTS: {
                    return {
                        ...state,
                        commentUpdated: false,
                        error: action.payload.error,
                    };
                }

                default:
                    return { ...state };
            }

        case LeadsActionTypes.CREATE_NEW_LEAD:
            return {
                ...state,
                loading: true,
            };

        case LeadsActionTypes.UPDATE_COMMENTS:
            return {
                ...state,
                loading: false,
                commentUpdated: false,
            };

        default:
            return { ...state };
    }
};

export default Leads;
