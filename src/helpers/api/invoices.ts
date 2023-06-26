import { APICore } from './apiCore';

const api = new APICore();

type InvoiceDetails = {
    currency: string;
    email: string;
    fullName: string;
    invoiceNumber: string;
    projectCategory: string;
    address: string;
    address2: string;
    phoneNumber: string;
    invoiceDate: string;
    dueDate: string;
    memo: string;
    description: string;
    total: number;
    amountDue: number;
    quantity: number;
    customer: string;
};

function createInvoiceApi(params: InvoiceDetails) {
    const baseUrl = '/invoices/create';
    return api.create(baseUrl, params);
}

export { createInvoiceApi };
