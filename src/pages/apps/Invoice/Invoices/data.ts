// types
import { Record } from './types';

const records: Record[] = [
    {
        id: 1,
        status: 'Paid',
        invoiceNumber: '1001',
        dueDate: '2023-04-21',
        amount: 2000,
        pendingAmount: 1200,
        category: 'Web Development',
    },
    {
        id: 2,
        status: 'Pending',
        invoiceNumber: '1002',
        dueDate: '2023-04-21',
        amount: 21230,
        pendingAmount: 12200,
        category: 'Logo Design',
    },
    {
        id: 3,
        status: 'Paid',
        invoiceNumber: '1003',
        dueDate: '2023-04-21',
        amount: 2000,
        pendingAmount: 1200,
        category: 'App Development',
    },
    {
        id: 4,
        status: 'Paid',
        invoiceNumber: '1004',
        dueDate: '2023-04-21',
        amount: 2000,
        pendingAmount: 1200,
        category: 'Logo Design',
    },
];

export { records };
