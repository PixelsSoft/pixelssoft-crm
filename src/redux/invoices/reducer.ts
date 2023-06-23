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

/* 
Invoices type should be defined and assigned to invoices:
*/
type State = {
    loading: boolean;
    invoices: any[] | null;
};
const INIT_STATE: State = {
    loading: false,
    invoices: [],
};

const Invoices = (state: State = INIT_STATE, action: ActionType) => {};

export default Invoices;
