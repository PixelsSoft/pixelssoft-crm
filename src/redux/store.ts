
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import LayoutReducer from './Slices/layout/Layout';
import AuthReducer from './Slices/auth/Auth';
import Utiltities from './Slices/utiltities/Utiltities';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/es/storage';
import Employee from './Slices/employee/Employee';
import Invoices from './Slices/Invoices/Invoices';
import Category from './Slices/Category/category';
import CustomerSlice from './Slices/Customer/customer';
import Platforms from './Slices/Platform/platform';
import Projects from './Slices/Project/Project';
import PortalProjects from './Slices/PortalProject/PortalProject';
import Roles from './Slices/Roles/Roles';
import leads from './Slices/Leads/leads';
import Bids from './Slices/Bids/Bids';
import Attendance from './Slices/attendance/Attendance';
import ExpenseCategory from './Slices/ExpenseCategory/expenseCategory';
import Expense from './Slices/Expense/expense';
import VendorCategory from './Slices/VendorCategory/VendorCategory';
import Vendor from './Slices/Vendor/Vendor';
import VendorPayment from './Slices/VendorPayment/VendorPayment';

const persistConfig = {
  key: 'root',
  storage: localStorage,
};

const reducer = combineReducers({
  Layout: LayoutReducer,
  Auth: AuthReducer,
  Attendance:Attendance,
  utiltities: Utiltities,
  Employees: Employee,
  Invoices: Invoices,
  Category: Category,
  Customer: CustomerSlice,
  Platform: Platforms,
  Projects: Projects,
  Roles: Roles,
  Leads: leads,
  Bids:Bids,
  ExpenseCategory: ExpenseCategory,
  Expense: Expense,
  VendorCategory: VendorCategory,
  Vendor: Vendor,
  VendorPayment: VendorPayment,
  PortalProjects:PortalProjects
});

const persistedReducer = persistReducer(persistConfig, reducer);



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;