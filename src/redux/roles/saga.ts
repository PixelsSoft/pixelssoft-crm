import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { rolesApiResponseSuccess, rolesApiResponseError } from './actions';
import { RoleActionTypes } from './constants';
import { createRoleApi, getRolesApi } from '../../helpers/api/roles';

type RoleData = {
    type: string;
    payload: {
        title: string;
        all: boolean;
        allowDashboard: boolean;
        allowViewInvoices: boolean;
        allowCreateInvoices: boolean;
        allowViewCustomers: boolean;
        allowCreateCustomers: boolean;
        allowViewProjects: boolean;
        allowCreateProjects: boolean;
        allowSales: boolean;
        allowViewUsers: boolean;
        allowCreateUsers: boolean;
        allowReports: boolean;
        allowViewExpenses: boolean;
        allowCreateExpenses: boolean;
        allowPayouts: boolean;
        allowAttendance: boolean;
        allowLeads: boolean;
    };
};

function* createRoleSaga({ payload }: RoleData): SagaIterator {
    try {
        const response = yield call(createRoleApi, { ...payload });
        const data = response.data;
        yield put(rolesApiResponseSuccess(RoleActionTypes.CREATE_ROLE, data));
    } catch (err: any) {
        yield put(rolesApiResponseError(RoleActionTypes.CREATE_ROLE, err || 'Error'));
    }
}

function* getRolesSaga(): SagaIterator {
    try {
        const response = yield call(getRolesApi, {});
        const data = response.data;

        yield put(rolesApiResponseSuccess(RoleActionTypes.GET_ALL_ROLES, data));
    } catch (err: any) {
        yield put(rolesApiResponseError(RoleActionTypes.GET_ALL_ROLES, err || 'Error'));
    }
}

function* watchCreateRole() {
    yield takeEvery(RoleActionTypes.CREATE_ROLE, createRoleSaga);
}

function* watchGetRoles() {
    yield takeEvery(RoleActionTypes.GET_ALL_ROLES, getRolesSaga);
}

function* roleSaga() {
    yield all([fork(watchCreateRole), fork(watchGetRoles)]);
}

export default roleSaga;
