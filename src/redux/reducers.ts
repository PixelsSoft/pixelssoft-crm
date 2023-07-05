import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Customer from './customers/reducers';
import Layout from './layout/reducers';
import PageTitle from './pageTitle/reducers';
import projectCategories from './projectCategories/reducer';
import Leads from './leads/reducer';

import Roles from './roles/reducer';
import Invoices from './invoices/reducer';

export default combineReducers({
    Auth,
    Customer,
    Roles,
    Leads,
    ProjectCategories: projectCategories,
    Invoices,
    Layout,
    PageTitle,
});
