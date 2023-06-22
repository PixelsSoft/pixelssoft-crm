import { APICore } from './apiCore';

const api = new APICore();

type CustomerData = {
    email: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    address2: string;
    platform: string;
    salePerson: string;
};

// account
function createCustomer(params: CustomerData) {
    const baseUrl = '/customers/create';
    return api.create(`${baseUrl}`, params);
}

function getCustomersApi(params: {}) {
    const baseUrl = '/customers';
    return api.get(`${baseUrl}`, params);
}

function deleteCustomerApi(params: { id: string }) {
    const baseUrl = `/customers/delete/${params.id}`;
    return api.delete(`${baseUrl}`);
}

export { createCustomer, getCustomersApi, deleteCustomerApi };
