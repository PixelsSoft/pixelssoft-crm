import { ProjectCategoriesTypes } from './constants';

type ActionObject = {
    type:
        | ProjectCategoriesTypes.API_RESPONSE_SUCCESS
        | ProjectCategoriesTypes.API_RESPONSE_FAILURE
        | ProjectCategoriesTypes.CREATE_CATEGORY
        | ProjectCategoriesTypes.DELETE_CATEGORIES
        | ProjectCategoriesTypes.GET_CATEGORIES
        | ProjectCategoriesTypes.RESET_CATEGORIES
        | ProjectCategoriesTypes.RESET_CREATE_CATEGORY;

    payload: {} | string;
};

type CreateCategoryType = {
    name: string;
};

export const projectCategoryApiResponseSuccess = (actionType: string, data: any): ActionObject => ({
    type: ProjectCategoriesTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const projectCategoryApiResponseError = (actionType: string, error: string): ActionObject => ({
    type: ProjectCategoriesTypes.API_RESPONSE_FAILURE,
    payload: { actionType, error },
});

export const createCategory = (details: CreateCategoryType): ActionObject => ({
    type: ProjectCategoriesTypes.CREATE_CATEGORY,
    payload: details,
});

export const getAllCategories = (): ActionObject => ({
    type: ProjectCategoriesTypes.GET_CATEGORIES,
    payload: {},
});

export const deleteCategory = (id: string): ActionObject => ({
    type: ProjectCategoriesTypes.DELETE_CATEGORIES,
    payload: id,
});

export const resetCreateCategory = (): ActionObject => ({
    type: ProjectCategoriesTypes.RESET_CREATE_CATEGORY,
    payload: {},
});
