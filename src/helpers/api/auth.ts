import { APICore } from './apiCore';

const api = new APICore();

// account
function login(params: { email: string; password: string }) {
    const baseUrl = '/users/login';
    return api.create(`${baseUrl}`, params);
}

function logout() {
    const baseUrl = '/logout/';
    return api.create(`${baseUrl}`, {});
}

function signup(params: { fullname: string; email: string; password: string }) {
    const baseUrl = '/register/';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { email: string }) {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

function createUserApi(formData: FormData) {
    const baseUrl = '/users/create';
    return api.create(`${baseUrl}`, formData);
}

function getUsersApi() {
    const baseUrl = '/users';
    return api.get(`${baseUrl}`, {});
}

export { login, logout, signup, forgotPassword, createUserApi, getUsersApi };
