import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import { InvoiceActionTypes } from './constants';
import { SagaIterator } from 'redux-saga';
import { InvoiceApiResponseError, InvoiceApiResponseSuccess } from './actions';
import { createInvoiceApi, getInvoiceNumberApi } from '../../helpers/api/invoices';

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
        yield put(InvoiceApiResponseSuccess(InvoiceActionTypes.CREATE_INVOICE, data));
    } catch (err: any) {
        yield put(InvoiceApiResponseError(InvoiceActionTypes.CREATE_INVOICE, err));
    }
}

function* getInvoiceNumber(): SagaIterator {
    try {
        const response = yield call(getInvoiceNumberApi, {});
        const data = response.data;
        yield put(InvoiceApiResponseSuccess(InvoiceActionTypes.GET_INVOICE_NUMBER, data));
    } catch (err: any) {
        yield put(InvoiceApiResponseError(InvoiceActionTypes.GET_INVOICE_NUMBER, err || 'Error'));
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

export function* watchGenerateInvoiceNumber() {
    yield takeEvery(InvoiceActionTypes.GET_INVOICE_NUMBER, getInvoiceNumber);
}

function* InvoicesSaga() {
    yield all([
        fork(watchCreateInvoice),
        fork(watchDeleteInvoice),
        fork(watchGetAllInvoices),
        fork(watchGenerateInvoiceNumber),
    ]);
}

export default InvoicesSaga;
