import { InvoiceActionTypes } from './constants';
import { Invoice } from './reducer';

export type InvoiceActionType = {
    type:
        | InvoiceActionTypes.API_RESPONSE_SUCCESS
        | InvoiceActionTypes.API_RESPONSE_ERROR
        | InvoiceActionTypes.CREATE_INVOICE
        | InvoiceActionTypes.DELETE_INVOICE
        | InvoiceActionTypes.GET_ALL_INVOICES
        | InvoiceActionTypes.GET_SHARE_LINK
        | InvoiceActionTypes.SEND_EMAIL
        | InvoiceActionTypes.GET_INVOICE_NUMBER
        | InvoiceActionTypes.RESET_INVOICE;

    payload: {} | string;
};

type InvoiceDetails = {
    currency: string;
    invoiceNumber: string;
    projectCategory: string | undefined;
    address: string;
    address2: string;
    phoneNumber: string;
    invoiceDate: string;
    dueDate: string;
    memo: string;
    description: string;
    total: number;
    amountDue: number;
    quantity: number;
    customer: string | undefined;
    customerName: string;
    customerEmail: string;
};

export const InvoiceApiResponseSuccess = (
    actionType: string,
    data: Invoice[] | Invoice | {} | null
): InvoiceActionType => ({
    type: InvoiceActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const InvoiceApiResponseError = (actionType: string, error: string): InvoiceActionType => ({
    type: InvoiceActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const createInvoice = (details: InvoiceDetails): InvoiceActionType => ({
    type: InvoiceActionTypes.CREATE_INVOICE,
    payload: details,
});

export const deleteInvoice = (id: string): InvoiceActionType => ({
    type: InvoiceActionTypes.DELETE_INVOICE,
    payload: id,
});

export const getAllInvoices = (): InvoiceActionType => ({
    type: InvoiceActionTypes.GET_ALL_INVOICES,
    payload: {},
});

export const getInvoiceNumber = (): InvoiceActionType => ({
    type: InvoiceActionTypes.GET_INVOICE_NUMBER,
    payload: {},
});

export const resetInvoice = (): InvoiceActionType => ({
    type: InvoiceActionTypes.RESET_INVOICE,
    payload: {},
});
