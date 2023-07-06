import { APICore } from './apiCore';

const api = new APICore();

type Lead = {
    name: string;
    email: string;
    phone?: string;
    status?: 'Responded' | 'Not Responded';
    comments?: string;
};

function createLeadApi(params: Lead) {
    const baseUrl = '/leads/create';
    return api.create(baseUrl, params);
}

function getAllLeadsApi(params: {}) {
    const baseUrl = '/leads';
    return api.get(baseUrl, params);
}

function updateCommentApi(params: { id: string; comment: string }) {
    const baseUrl = '/leads/comments/' + params.id;
    return api.updatePatch(baseUrl, { comments: params.comment });
}

function deleteLeadApi(id: string) {
    const baseUrl = '/leads/delete';
    return api.delete(`${baseUrl}/${id}`);
}

function updateStatusApi(payload: { id: string; status: 'Responded' | 'Not Responded' | '' }) {
    console.log('api payload: ', payload);
    const baseUrl = '/leads/status';
    return api.updatePatch(`${baseUrl}/${payload.id}`, { status: payload.status });
}

export { createLeadApi, getAllLeadsApi, updateCommentApi, deleteLeadApi, updateStatusApi };
