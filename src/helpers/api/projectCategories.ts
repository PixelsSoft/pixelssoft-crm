import { APICore } from './apiCore';

const api = new APICore();

function createProjectCategory(params: any) {
    const baseUrl = '/categories/create';
    return api.create(baseUrl, params);
}

function getAllProjectCategories(params: {}) {
    const baseUrl = '/categories';
    return api.get(baseUrl, params);
}
export { createProjectCategory, getAllProjectCategories };
