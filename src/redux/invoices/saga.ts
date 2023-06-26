import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import { InvoiceActionTypes } from './constants';
import { SagaIterator } from 'redux-saga';
import { InvoiceApiResponseError, InvoiceApiResponseSuccess } from './actions';
import { createInvoiceApi } from '../../helpers/api/invoices';

type InvoiceDetailsType = {
    payload: {
        currency: string;
        email: string;
        fullName: string;
        invoiceNumber: string;
        projectCategory: string;
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
        customer: string;
    };
    type: string;
};

function* createInvoiceSaga({ payload }: InvoiceDetailsType): SagaIterator {
    try {
        const response = yield call(createInvoiceApi, payload);
        const data = response.data;
        console.log(data);
        yield put(InvoiceApiResponseSuccess(InvoiceActionTypes.CREATE_INVOICE, data));
    } catch (err: any) {
        yield put(InvoiceApiResponseError(InvoiceActionTypes.CREATE_INVOICE, err));
    }
}

function* deleteInvoiceSaga(): SagaIterator {}

function* getAllInvoicesSaga(): SagaIterator {}

export function* watchCreateInvoice() {
    yield takeEvery(InvoiceActionTypes.CREATE_INVOICE, createInvoiceSaga);
}

export function* watchDeleteInvoice() {
    yield takeEvery(InvoiceActionTypes.DELETE_INVOICE, deleteInvoiceSaga);
}

export function* watchGetAllInvoices() {
    yield takeEvery(InvoiceActionTypes.GET_ALL_INVOICES, getAllInvoicesSaga);
}

function* InvoicesSaga() {
    yield all([fork(watchCreateInvoice), fork(watchDeleteInvoice), fork(watchGetAllInvoices)]);
}

export default InvoicesSaga;
