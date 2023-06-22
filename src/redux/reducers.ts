import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Customer from './customers/reducers';
import Layout from './layout/reducers';
import PageTitle from './pageTitle/reducers';
import Roles from './roles/reducer';

export default combineReducers({
    Auth,
    Customer,
    Roles,
    Layout,
    PageTitle,
});
