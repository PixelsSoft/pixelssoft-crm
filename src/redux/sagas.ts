import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import customerSaga from './customers/saga';
import roleSaga from './roles/saga';
import layoutSaga from './layout/saga';

export default function* rootSaga() {
    yield all([authSaga(), customerSaga(), roleSaga(), layoutSaga()]);
}
