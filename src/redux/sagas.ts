import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import customerSaga from './customers/saga';
import InvoicesSaga from './invoices/saga';
import projectCategoriesSaga from './projectCategories/saga';
import leadsSaga from './leads/saga';

import roleSaga from './roles/saga';

import layoutSaga from './layout/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        customerSaga(),
        roleSaga(),
        layoutSaga(),
        InvoicesSaga(),
        projectCategoriesSaga(),
        leadsSaga(),
    ]);
}
