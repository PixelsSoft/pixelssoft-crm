export type ProjectCategory = {
    _id: string;
    name: string;
};

export type PurchaseHistoryItem = {
    _id: string;
    invoiceNumber: string;
    customerName: string;
    customerEmail: string;
    currency: string;
    projectCategory: ProjectCategory;
    address: string;
    address2: string;
    phoneNumber: string;
    dateCreated: string;
    dueDate: string;
    memo: string;
    total: number;
    amountDue: number;
    quantity: number;
    customerId: string;
};

export type CustomerData = {
    _id: number;
    email: string;
    name: string;
    phoneNumber: string;
    company: string;
    address: string;
    address2: string;
    purchaseHistory: PurchaseHistoryItem[] | [];
};
