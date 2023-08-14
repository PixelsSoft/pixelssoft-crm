import { CustomerActionTypes } from './constants';
import { CustomerData } from './types';

export type CustomerActionType = {
    type:
    | CustomerActionTypes.API_RESPONSE_SUCCESS
    | CustomerActionTypes.API_RESPONSE_ERROR
    | CustomerActionTypes.CREATE_CUSTOMER
    | CustomerActionTypes.GET_CUSTOMERS
    | CustomerActionTypes.GET_CUSTOMER_PROFILE
    | CustomerActionTypes.RESET_CUSTOMERS
    | CustomerActionTypes.DELETE_CUSTOMER;

    payload: {} | string;
};

type CustomerDetails = {
    email: string;
    fullName: string;
    phoneNumber: string;
    company: string;
    address: string;
    platform: string;
    salePerson: string;
};

export const customerApiResponseSuccess = (
    actionType: string,
    data: CustomerData | CustomerData[] | {}
): CustomerActionType => ({
    type: CustomerActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const customerApiResponseError = (actionType: string, error: string): CustomerActionType => ({
    type: CustomerActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getCustomers = (): CustomerActionType => ({
    type: CustomerActionTypes.GET_CUSTOMERS,
    payload: {},
});

export const createCustomer = (customerDetails: CustomerDetails): CustomerActionType => ({
    type: CustomerActionTypes.CREATE_CUSTOMER,
    payload: customerDetails,
});

export const getCustomerById = (id: string): CustomerActionType => ({
    type: CustomerActionTypes.GET_CUSTOMER_PROFILE,
    payload: { id },
});

export const resetCustomers = (): CustomerActionType => ({
    type: CustomerActionTypes.RESET_CUSTOMERS,
    payload: {},
});

export const deleteCustomer = (id: string): CustomerActionType => ({
    type: CustomerActionTypes.DELETE_CUSTOMER,
    payload: { id },
});
