import { InvoiceActionTypes } from './constants';

export type ActionType = {
    type:
        | InvoiceActionTypes.API_RESPONSE_SUCCESS
        | InvoiceActionTypes.API_RESPONSE_ERROR
        | InvoiceActionTypes.CREATE_INVOICE
        | InvoiceActionTypes.DELETE_INVOICE
        | InvoiceActionTypes.GET_ALL_INVOICES
        | InvoiceActionTypes.GET_SHARE_LINK
        | InvoiceActionTypes.SEND_EMAIL;

    payload: {
        actionType?: string;
        data?: {};
        error?: string;
    };
};

export type Invoice = {
    _id: string;
    invoiceNumber: string;
    customerName: string;
    customerEmail: string;
    currency: string;
    projectCategory: string;
    address: string;
    address2: string;
    phoneNumber: string;
    dateCreated: string;
    dueDate: string;
    memo: string;
    total: number;
    amountDue: number;
    quantity: number;
    description: string;
    customer: string;
};

/* 
Invoices type should be defined and assigned to invoices:
*/
type State = {
    loading: boolean;
    invoices: Invoice[] | null;
};
const INIT_STATE: State = {
    loading: false,
    invoices: null,
};

const Invoices = (state: State = INIT_STATE, action: ActionType): any => {
    switch (action.type) {
        case InvoiceActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case InvoiceActionTypes.CREATE_INVOICE: {
                    return {
                        ...state,
                        loading: false,
                        invoiceCreated: true,
                    };
                }

                case InvoiceActionTypes.GET_ALL_INVOICES: {
                    return {
                        ...state,
                        loading: false,
                        invoices: action.payload.data,
                    };
                }

                case InvoiceActionTypes.DELETE_INVOICE: {
                    return {
                        ...state,
                        loading: false,
                        invoiceDeleted: true,
                    };
                }

                default: {
                    return { ...state };
                }
            }

        case InvoiceActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case InvoiceActionTypes.CREATE_INVOICE: {
                    return {
                        ...state,
                        loading: false,
                        invoiceCreated: false,
                        error: action.payload.error,
                    };
                }

                case InvoiceActionTypes.GET_ALL_INVOICES: {
                    return {
                        ...state,
                        invoices: null,
                    };
                }

                case InvoiceActionTypes.DELETE_INVOICE: {
                    return {
                        ...state,
                        loading: false,
                        invoiceDeleted: false,
                        error: action.payload.error,
                    };
                }

                default: {
                    return { ...state };
                }
            }

        case InvoiceActionTypes.CREATE_INVOICE:
            return { ...state, loading: true, invoiceCreated: false };

        case InvoiceActionTypes.DELETE_INVOICE: {
            return { ...state, loading: true, invoiceDeleted: false };
        }

        case InvoiceActionTypes.GET_ALL_INVOICES: {
            return {
                ...state,
                loading: true,
                invoices: null,
            };
        }

        default: {
            return { ...state };
        }
    }
};

export default Invoices;
