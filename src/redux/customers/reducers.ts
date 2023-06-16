//import { APICore } from '../../helpers/api/apiCore';

import { CustomerActionTypes } from './constants';

//const api = new APICore();

const INIT_STATE = {
    customers: null,
    loading: false,
};

type ProjectCategory = {
    _id: string;
    name: string;
};

type PurchaseHistoryItem = {
    _id: string;
    invoiceNumber: string;
    customerName: string;
    customerEmail: string;
    currency: string;
    projectCategory: ProjectCategory;
    address: string;
    address2: string;
    phoneNumber: string;
    dateCreated: string;
    dueDate: string;
    memo: string;
    total: number;
    amountDue: number;
    quantity: number;
    customer: CustomerData;
};

type CustomerData = {
    _id: number;
    email: string;
    name: string;
    phoneNumber: string;
    company: string;
    address: string;
    address2: string;
    purchaseHistory: PurchaseHistoryItem[] | [];
};

type CustomerActionType = {
    type:
        | CustomerActionTypes.API_RESPONSE_SUCCESS
        | CustomerActionTypes.API_RESPONSE_ERROR
        | CustomerActionTypes.CREATE_CUSTOMER
        | CustomerActionTypes.GET_CUSTOMERS;
    payload: {
        actionType?: string;
        data?: CustomerData | {};
        error?: string;
    };
};

type State = {
    customers?: CustomerData[] | null;
    loading?: boolean;
};

const Customer = (state: State = INIT_STATE, action: CustomerActionType): any => {
    switch (action.type) {
        case CustomerActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case CustomerActionTypes.CREATE_CUSTOMER: {
                    return {
                        ...state,
                        createCustomer: true,
                        loading: false,
                    };
                }

                case CustomerActionTypes.GET_CUSTOMERS: {
                    return {
                        ...state,
                        customers: action.payload.data,
                        loading: false,
                    };
                }
            }
    }
};

export default Customer;
