import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { LeadsActionTypes } from './constants';
import { LeadsApiResponseError, LeadsApiResponseSuccess } from './actions';
import { createLeadApi, getAllLeadsApi, updateCommentApi } from '../../helpers/api/leads';

type Lead = {
    type: string;
    payload: {
        name: string;
        email: string;
        phone?: string;
        status?: 'Responded' | 'Not Responded';
        comments?: string;
    };
};

type UpdateComment = {
    type: string;
    payload: {
        id: string;
        comment: string;
    };
};

function* createLeadSaga({ payload }: Lead): SagaIterator {
    try {
        const response = yield call(createLeadApi, payload);
        const data = response.data;

        yield put(LeadsApiResponseSuccess(LeadsActionTypes.CREATE_NEW_LEAD, data));
    } catch (err: any) {
        yield put(LeadsApiResponseError(LeadsActionTypes.CREATE_NEW_LEAD, err || 'Error'));
    }
}

function* getAllLeadsSaga(): SagaIterator {
    try {
        const response = yield call(getAllLeadsApi, {});
        const data = response.data.data;
        yield put(LeadsApiResponseSuccess(LeadsActionTypes.GET_ALL_LEADS, data));
    } catch (err: any) {
        yield put(LeadsApiResponseError(LeadsActionTypes.GET_ALL_LEADS, err || 'Error'));
    }
}

function* updateComments({ payload }: UpdateComment): SagaIterator {
    try {
        const response = yield call(updateCommentApi, payload);
        const data = response.data.data;
        yield put(LeadsApiResponseSuccess(LeadsActionTypes.UPDATE_COMMENTS, data));
    } catch (err: any) {
        yield put(LeadsApiResponseError(LeadsActionTypes.UPDATE_COMMENTS, err || 'Error updating comment'));
    }
}

export function* createLeadWatcher() {
    yield takeEvery(LeadsActionTypes.CREATE_NEW_LEAD, createLeadSaga);
}

export function* getAllLeadsWatcher() {
    yield takeEvery(LeadsActionTypes.GET_ALL_LEADS, getAllLeadsSaga);
}

export function* updateCommentWatcher() {
    yield takeEvery(LeadsActionTypes.UPDATE_COMMENTS, updateComments);
}

export default function* leadsSaga() {
    yield all([fork(createLeadWatcher), fork(getAllLeadsWatcher), fork(updateCommentWatcher)]);
}
