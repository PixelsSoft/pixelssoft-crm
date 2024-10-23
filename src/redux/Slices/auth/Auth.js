import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "../../Services/auth.services";
import { GetEmployees } from "../employee/Employee";
import { GetCustomer } from "../Customer/customer";
import { GetInvoice } from "../Invoices/Invoices";
import { GetProject } from "../Project/Project";
import { GetPlatform } from "../Platform/platform";
import { GetCategory } from "../Category/category";
import { getRoles, userRoles } from "../Roles/Roles";
import { GetLead } from "../Leads/leads";
import { GetExpenseCategory } from "../ExpenseCategory/expenseCategory";
import { GetExpense } from "../Expense/expense";
import { GetVenCat } from "../VendorCategory/VendorCategory";
import { GetVendor } from "../Vendor/Vendor";
import { GetVendorPayments } from "../VendorPayment/VendorPayment";
import { GetMonthBids, GetTodayBids } from "../Bids/Bids";
import { attendance, getAttendance } from "../attendance/Attendance";
import { GetPortalProject } from "../PortalProject/PortalProject";
import { GetBanks } from "../Bank/banks";
import { GetMails, GetUserMail } from "../usermail/UserMail";

const initialState = {
  user: null,
  isSuperAdmin: false,
  roles: [],
  permissions: null,
  token: null,
  loading: false,
  error: null,
  passwordReset: null,
  resetPasswordSuccess: {
    message: null,
  },
  userSignUp: null,
};
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  // Format the time as needed (e.g., 24-hour format, leading zeros)
  return `${hours}:${minutes}:${seconds}`;
};
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await authService
        .login({ email, password })
        .then(async (response) => {
          await dispatch(userToken(response?.access_token));
          await dispatch(GetEmployees(response?.access_token));
          await dispatch(GetPlatform(response?.access_token));
          await dispatch(GetLead(response?.access_token));
          await dispatch(GetCategory(response?.access_token));
          await dispatch(GetTodayBids(response?.access_token));
          await dispatch(GetMonthBids(response?.access_token));
          await dispatch(GetExpenseCategory(response?.access_token));
          await dispatch(attendance(response?.access_token));
          await dispatch(GetPortalProject(response?.access_token));
          await dispatch(GetProject(response?.access_token));
          await dispatch(GetBanks(response?.access_token));
          await dispatch(GetCustomer(response?.access_token));
          await dispatch(GetExpense(response?.access_token));
          await dispatch(GetInvoice(response?.access_token));

          await dispatch(
            authService
              .getProfile(response?.access_token)
              .then(async (res) => {

                await dispatch(loginUser(res?.data));
                const role = res?.roles[0].role.split(",");
                if (role.includes("SuperAdmin")) {
                  await dispatch(setIsAdmin(true));
                  await dispatch(GetMails(response?.access_token));
                } else {
                  await dispatch(setIsAdmin(false));
                  await dispatch(
                    GetUserMail(res?.data?.user_id, response?.access_token)
                  );
                }

                await dispatch(userRoles(res?.roles));
                const data = {
                  token: response?.access_token,
                  date: new Date().toLocaleDateString(),
                  role: res?.roles[0]?.role,
                  time: getCurrentTime(),
                };
                if (window.electron && window.electron.ipcRenderer) {
                  window.electron.ipcRenderer.send("login-success", data);
                }
              })
              .catch((err) => console.log("error: ", err))
          );

          toast.success(response?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error(error?.detail, { position: toast.POSITION.TOP_RIGHT });
        });
      // await dispatch( loginUser( response?.data?.user ) );
      // await dispatch( userPermission( response?.data?.permission ) );

      // await dispatch( GetEmployees( response?.data?.token ) );
      // await dispatch( GetCustomer( response?.data?.token ) );
      // await dispatch( GetInvoice( response?.data?.token ) );

      // await dispatch( getRoles( response?.data?.token ) );

      // await dispatch( GetExpense( response?.data?.token ) );
      // await dispatch( GetVenCat( response?.data?.token ) );
      // await dispatch( GetVendor( response?.data?.token ) );
      // await dispatch( GetVendorPayments( response?.data?.token ) );
    } catch (error) {
      console.log("error===========>", error);
    }
  };
export const SearchUser = (search, token) => async (dispatch) => {
  try {
    const response = await authService.searchUser(search, token);

    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutUser(""));
    dispatch(userRoles(null));
    dispatch(userToken(null));
  } catch (error) {
    console.log("error===========>", error);
  }
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    resetAuth: (state, action) => {},
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isSuperAdmin = action.payload;
    },
    userRoles: (state, action) => {
      state.roles = action.payload;
    },
    userToken: (state, action) => {
      state.token = action.payload;
    },
    forgotPassword: (state, action) => {},
    logoutUser: (state, action) => {
      state.user = "";
      state.permissions = "";
      state.token = null;
      state.userAuthenticate = false;
    },
    signupUser: (state, action) => {
      state.userSignUp = action.payload;
    },
    userPermission: (state, action) => {
      state.permissions = action.payload;
    },
  },
});

export const {
  resetAuth,
  loginUser,
  forgotPassword,
  logoutUser,
  signupUser,
  userPermission,
  userToken,
  setIsAdmin,
} = AuthSlice.actions;
export default AuthSlice.reducer;
