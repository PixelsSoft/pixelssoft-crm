import { APICore } from './apiCore';

const api = new APICore();

type RoleData = {
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

function createRoleApi(params: RoleData) {
    const baseUrl = '/roles/create';
    return api.create(`${baseUrl}`, params);
}

function getRolesApi(params: {}) {
    const baseUrl = '/roles';
    return api.get(baseUrl, params);
}

export { createRoleApi, getRolesApi };
