import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// apicore
import { APICore, setAuthorization } from '../../helpers/api/apiCore';

// helpers
import {
    login as loginApi,
    logout as logoutApi,
    signup as signupApi,
    forgotPassword as forgotPasswordApi,
} from '../../helpers/';

// actions
import { authApiResponseSuccess, authApiResponseError } from './actions';

// constants
import { AuthActionTypes } from './constants';
import { createUserApi, getUsersApi } from '../../helpers/api/auth';

type UserData = {
    payload: {
        username: string;
        password: string;
        fullname: string;
        email: string;
    };
    type: string;
};

type RegisterUserData = {
    payload: {
        fullName: string;
        email: string;
        phoneNumber: string;
        position: string;
        role: string;
        designation: string;
        salary: number;
        password: string;
        profilePic?: File | null;
    };
    type: string;
};

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { email, password }, type }: UserData): SagaIterator {
    try {
        const response = yield call(loginApi, { email, password });

        const data = response.data.data;
        // NOTE - You can change this according to response format from your api
        api.setLoggedInUser(data);
        setAuthorization(data['token']);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, data));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error.response?.data?.error || 'Error'));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
    try {
        yield call(logoutApi);
        api.setLoggedInUser(null);
        setAuthorization(null);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

function* signup({ payload: { fullname, email, password } }: UserData): SagaIterator {
    try {
        const response = yield call(signupApi, { fullname, email, password });
        const user = response.data;
        // api.setLoggedInUser(user);
        // setAuthorization(user['token']);
        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

function* forgotPassword({ payload: { email } }: UserData): SagaIterator {
    try {
        const response = yield call(forgotPasswordApi, { email });
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
    }
}

function* getAllUsersSaga(): SagaIterator {
    try {
        console.log('hello');
        const response = yield call(getUsersApi);
        const users = response.data.data;
        console.log(users);
        yield put(authApiResponseSuccess(AuthActionTypes.GET_ALL_USERS, users));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.GET_ALL_USERS, error || 'Error'));
    }
}

function* createUserAccountSaga({ payload }: RegisterUserData): SagaIterator {
    try {
        const formData = new FormData();

        formData.append('email', payload.email);
        formData.append('fullName', payload.fullName);
        formData.append('designation', payload.designation);
        formData.append('role', payload.role);
        formData.append('phoneNumber', payload.phoneNumber);
        formData.append('password', payload.password);
        formData.append('salary', payload.salary.toString());
        formData.append('position', payload.position);
        if (payload.profilePic) {
            formData.append('profilePic', payload.profilePic);
        }

        const response = yield call(createUserApi, formData);
        const data = response.data;
        yield put(authApiResponseSuccess(AuthActionTypes.CREATE_USER, data));
    } catch (error: any) {
        yield put(authApiResponseError(AuthActionTypes.CREATE_USER, error));
    }
}

export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchCreateUserAccountSaga(): any {
    yield takeEvery(AuthActionTypes.CREATE_USER, createUserAccountSaga);
}

export function* watchGetUsersSaga(): any {
    yield takeEvery(AuthActionTypes.GET_ALL_USERS, getAllUsersSaga);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchForgotPassword),
        fork(watchCreateUserAccountSaga),
        fork(watchGetUsersSaga),
    ]);
}

export default authSaga;
