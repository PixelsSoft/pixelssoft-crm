import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Customer from './customers/reducers';
import Layout from './layout/reducers';
import PageTitle from './pageTitle/reducers';
import projectCategories from './projectCategories/reducer';

import Roles from './roles/reducer';

export default combineReducers({
    Auth,
    Customer,
    Roles,
    ProjectCategories: projectCategories,
    Layout,
    PageTitle,
});
