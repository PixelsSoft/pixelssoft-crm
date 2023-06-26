import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { ProjectCategoriesTypes } from './constants';
import { projectCategoryApiResponseError, projectCategoryApiResponseSuccess } from './actions';
import { createProjectCategory, getAllProjectCategories } from '../../helpers/api/projectCategories';
import { SagaIterator } from 'redux-saga';

type ProjectCategorySagaArgs = {
    type: string;
    payload: any;
};

function* createProjectCategorySaga({ payload }: ProjectCategorySagaArgs): SagaIterator {
    try {
        const response = yield call(createProjectCategory, payload);
        const data = response.data;
        yield put(projectCategoryApiResponseSuccess(ProjectCategoriesTypes.CREATE_CATEGORY, data));
    } catch (err: any) {
        yield put(projectCategoryApiResponseError(ProjectCategoriesTypes.CREATE_CATEGORY, err || 'Error'));
    }
}

function* deleteProjectCategorySaga(): SagaIterator {}

function* getProjectCategoriesSaga(): SagaIterator {
    try {
        const response = yield call(getAllProjectCategories, {});
        const data = response.data;
        yield put(projectCategoryApiResponseSuccess(ProjectCategoriesTypes.GET_CATEGORIES, data));
    } catch (err: any) {
        yield put(projectCategoryApiResponseError(ProjectCategoriesTypes.GET_CATEGORIES, err || 'Error'));
    }
}

export function* watchCreateProjectCategory() {
    yield takeEvery(ProjectCategoriesTypes.CREATE_CATEGORY, createProjectCategorySaga);
}

export function* watchDeleteProject() {
    yield takeEvery(ProjectCategoriesTypes.DELETE_CATEGORIES, deleteProjectCategorySaga);
}

export function* watchGetAllProjectCategories() {
    yield takeEvery(ProjectCategoriesTypes.GET_CATEGORIES, getProjectCategoriesSaga);
}

function* projectCategoriesSaga() {
    yield all([fork(watchCreateProjectCategory), fork(watchDeleteProject), fork(watchGetAllProjectCategories)]);
}

export default projectCategoriesSaga;
