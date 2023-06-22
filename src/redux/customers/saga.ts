import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { customerApiResponseError, customerApiResponseSuccess } from './actions';
import { CustomerActionTypes } from './constants';
import { createCustomer as createApi, getCustomersApi, deleteCustomerApi } from '../../helpers/api/customers';

type CustomerData = {
    payload: {
        email: string;
        fullName: string;
        phoneNumber: string;
        address: string;
        address2: string;
        platform: string;
        salePerson: string;
    };
    type: string;
};

type CustomerId = {
    payload: {
        id: string;
    };
    type: string;
};

function* createCustomer({ payload }: CustomerData): SagaIterator {
    try {
        const response = yield call(createApi, { ...payload });
        const data = response.data;
        yield put(customerApiResponseSuccess(CustomerActionTypes.CREATE_CUSTOMER, data));
    } catch (error: any) {
        yield put(customerApiResponseError(CustomerActionTypes.CREATE_CUSTOMER, error || 'Error'));
    }
}

function* getAllCustomers(): SagaIterator {
    try {
        const response = yield call(getCustomersApi, {});
        const customers = response.data.data;
        yield put(customerApiResponseSuccess(CustomerActionTypes.GET_CUSTOMERS, customers));
    } catch (error: any) {
        yield put(customerApiResponseError(CustomerActionTypes.GET_CUSTOMERS, error || 'Error'));
    }
}

function* deleteCustomerAsync({ payload }: CustomerId): SagaIterator {
    try {
        const response = yield call(deleteCustomerApi, { id: payload.id });
        const data = response.data;
        yield put(customerApiResponseSuccess(CustomerActionTypes.DELETE_CUSTOMER, data));
    } catch (error: any) {
        yield put(customerApiResponseError(CustomerActionTypes.DELETE_CUSTOMER, error || 'Error'));
    }
}

function* watchCreateCustomer() {
    yield takeEvery(CustomerActionTypes.CREATE_CUSTOMER, createCustomer);
}

function* watchGetCustomers() {
    yield takeEvery(CustomerActionTypes.GET_CUSTOMERS, getAllCustomers);
}

function* watchDeleteCustomer() {
    yield takeEvery(CustomerActionTypes.DELETE_CUSTOMER, deleteCustomerAsync);
}

function* customerSaga() {
    yield all([fork(watchCreateCustomer), fork(watchGetCustomers), fork(watchDeleteCustomer)]);
}

export default customerSaga;
