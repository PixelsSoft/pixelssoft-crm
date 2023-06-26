import { ProjectCategoriesTypes } from './constants';

type ProjectCategories = {
    _id: string;
    name: string;
};

type State = {
    loading: boolean;
    categories: ProjectCategories[] | null;
};

type ActionTypes = {
    type:
        | ProjectCategoriesTypes.API_RESPONSE_SUCCESS
        | ProjectCategoriesTypes.API_RESPONSE_FAILURE
        | ProjectCategoriesTypes.CREATE_CATEGORY
        | ProjectCategoriesTypes.DELETE_CATEGORIES
        | ProjectCategoriesTypes.GET_CATEGORIES
        | ProjectCategoriesTypes.RESET_CATEGORIES
        | ProjectCategoriesTypes.RESET_CREATE_CATEGORY;

    payload: {
        actionType?: string;
        data?: {} | null;
        error?: string;
    };
};

const INIT_STATE: State = {
    loading: false,
    categories: null,
};

const projectCategories = (state: State = INIT_STATE, action: ActionTypes) => {
    switch (action.type) {
        case ProjectCategoriesTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ProjectCategoriesTypes.CREATE_CATEGORY: {
                    return {
                        ...state,
                        loading: false,
                        categoryCreated: true,
                        data: action.payload.data,
                        error: null,
                    };
                }

                case ProjectCategoriesTypes.GET_CATEGORIES: {
                    return {
                        ...state,
                        loading: false,
                        categories: action.payload.data,
                    };
                }

                case ProjectCategoriesTypes.DELETE_CATEGORIES: {
                    return {
                        ...state,
                        loading: false,
                        categoryDeleted: true,
                    };
                }

                default: {
                    return { ...state };
                }
            }

        case ProjectCategoriesTypes.API_RESPONSE_FAILURE:
            switch (action.payload.actionType) {
                case ProjectCategoriesTypes.CREATE_CATEGORY: {
                    return {
                        ...state,
                        loading: false,
                        categoryCreated: false,
                        data: null,
                        error: action.payload.error,
                    };
                }

                case ProjectCategoriesTypes.GET_CATEGORIES: {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    };
                }

                case ProjectCategoriesTypes.DELETE_CATEGORIES: {
                    return {
                        ...state,
                        loading: false,
                        categoryDeleted: false,
                        error: action.payload.error,
                    };
                }

                default: {
                    return { ...state };
                }
            }

        case ProjectCategoriesTypes.CREATE_CATEGORY: {
            return { ...state, loading: true, categoryCreated: false, data: null };
        }

        case ProjectCategoriesTypes.GET_CATEGORIES: {
            return { ...state, loading: true, categories: null };
        }

        case ProjectCategoriesTypes.DELETE_CATEGORIES: {
            return { ...state, loading: true, categoryDeleted: false };
        }

        case ProjectCategoriesTypes.RESET_CATEGORIES: {
            return {
                ...state,
                loading: false,
                categoryCreated: false,
                error: null,
                data: null,
                categories: null,
                categoryDeleted: null,
            };
        }

        case ProjectCategoriesTypes.RESET_CREATE_CATEGORY: {
            return {
                ...state,
                categoryCreated: false,
                error: null,
                data: null,
            };
        }

        default: {
            return { ...state };
        }
    }
};

export default projectCategories;
