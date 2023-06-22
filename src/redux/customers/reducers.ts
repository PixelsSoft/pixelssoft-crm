//import { APICore } from '../../helpers/api/apiCore';

import { CustomerActionTypes } from './constants';
import { CustomerData } from './types';

//const api = new APICore();

export type ActionType = {
    type:
        | CustomerActionTypes.API_RESPONSE_SUCCESS
        | CustomerActionTypes.API_RESPONSE_ERROR
        | CustomerActionTypes.CREATE_CUSTOMER
        | CustomerActionTypes.GET_CUSTOMERS
        | CustomerActionTypes.GET_CUSTOMER_PROFILE
        | CustomerActionTypes.RESET_CUSTOMERS
        | CustomerActionTypes.DELETE_CUSTOMER;
    payload: {
        actionType?: string;
        data?: CustomerData | {};
        error?: string;
    };
};

export type State = {
    customers?: CustomerData[] | null;
    loading?: boolean;
    customerData?: CustomerData | null;
};

const INIT_STATE: State = {
    customers: null,
    loading: false,
    customerData: null,
};

const Customer = (state: State = INIT_STATE, action: ActionType): any => {
    switch (action.type) {
        case CustomerActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case CustomerActionTypes.CREATE_CUSTOMER: {
                    return {
                        ...state,
                        loading: false,
                        createCustomerSuccess: true,
                        data: action.payload.data,
                        error: null,
                    };
                }

                case CustomerActionTypes.GET_CUSTOMERS: {
                    return {
                        ...state,
                        customers: action.payload.data,
                        loading: false,
                    };
                }

                case CustomerActionTypes.GET_CUSTOMER_PROFILE: {
                    return {
                        ...state,
                        customers: null,
                        customerData: action.payload.data,
                    };
                }

                case CustomerActionTypes.DELETE_CUSTOMER: {
                    return {
                        ...state,
                        loading: false,
                        deleteCustomerSuccess: true,
                    };
                }

                default: {
                    return { ...state };
                }
            }

        case CustomerActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case CustomerActionTypes.CREATE_CUSTOMER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        data: null,
                        createCustomerSuccess: false,
                        loading: false,
                    };
                }

                case CustomerActionTypes.GET_CUSTOMERS: {
                    return {
                        ...state,
                        customers: null,
                        error: action.payload.error,
                        loading: false,
                    };
                }

                case CustomerActionTypes.GET_CUSTOMER_PROFILE: {
                    return {
                        ...state,
                        customerData: null,
                        data: null,
                        error: action.payload.error,
                        loading: false,
                    };
                }

                case CustomerActionTypes.DELETE_CUSTOMER: {
                    return {
                        ...state,
                        loading: false,
                        deleteCustomerSuccess: false,
                        error: action.payload.error,
                    };
                }

                default: {
                    return { ...state };
                }
            }

        case CustomerActionTypes.CREATE_CUSTOMER: {
            return {
                ...state,
                loading: true,
                createCustomerSuccess: false,
            };
        }

        case CustomerActionTypes.GET_CUSTOMERS: {
            return {
                ...state,
                loading: true,
            };
        }

        case CustomerActionTypes.DELETE_CUSTOMER: {
            return {
                ...state,
            };
        }

        case CustomerActionTypes.RESET_CUSTOMERS: {
            return {
                ...state,
                customers: null,
                loading: false,
                customerData: null,
                createCustomerSuccess: false,
                error: null,
                data: null,
            };
        }

        default: {
            return { ...state };
        }
    }
};

export default Customer;
