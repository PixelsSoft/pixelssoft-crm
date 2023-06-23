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
    invoices: [],
};

const Invoices = (state: State = INIT_STATE, action: ActionType) => {};

export default Invoices;
