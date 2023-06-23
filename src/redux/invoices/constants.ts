export enum InvoiceActionTypes {
    API_RESPONSE_SUCCESS = '@customers/API_RESPONSE_SUCCESS',
    API_RESPONSE_ERROR = '@customers/API_RESPONSE_ERROR',

    CREATE_INVOICE = '@invoice/CREATE_INVOICE',
    GET_ALL_INVOICES = '@invoice/GET_ALL_INVOICES',
    DELETE_INVOICE = '@invoice/DELETE_INVOICE',
    GET_SHARE_LINK = '@invoice/GET_SHARE_LINK',
    SEND_EMAIL = '@invoice/SEND_EMAIL',
}
