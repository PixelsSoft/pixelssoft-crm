// constants
import { AuthActionTypes } from './constants';

export type AuthActionType = {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.FORGOT_PASSWORD
        | AuthActionTypes.FORGOT_PASSWORD_CHANGE
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.RESET
        | AuthActionTypes.SIGNUP_USER
        | AuthActionTypes.CREATE_USER
        | AuthActionTypes.CREATE_USER_RESET
        | AuthActionTypes.GET_ALL_USERS;
    payload: {} | string;
};

type UserData = {
    user: {
        _id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        position: string;
        profilePic: {
            url: string;
            path: string;
        };
        role: string;
        designation: string;
        salary: string;
        _createdAt: string;
        password: string;
    };
    token: string;
};

type RegisterUserData = {
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

// common success
export const authApiResponseSuccess = (actionType: string, data: UserData | {}): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const loginUser = (email: string, password: string): AuthActionType => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { email, password },
});

export const logoutUser = (): AuthActionType => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

export const signupUser = (fullname: string, email: string, password: string): AuthActionType => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: { fullname, email, password },
});

export const forgotPassword = (email: string): AuthActionType => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: { email },
});

export const resetAuth = (): AuthActionType => ({
    type: AuthActionTypes.RESET,
    payload: {},
});

export const createUser = (details: RegisterUserData): AuthActionType => ({
    type: AuthActionTypes.CREATE_USER,
    payload: details,
});

export const createUserReset = (): AuthActionType => ({
    type: AuthActionTypes.CREATE_USER_RESET,
    payload: {},
});

export const getAllUsers = (): AuthActionType => ({
    type: AuthActionTypes.GET_ALL_USERS,
    payload: {},
});
