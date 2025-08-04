import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import EmployeeService from "../../Services/employees.services";
import { stopLoading } from "../utiltities/Utiltities";

const initialState = {
  roles: [],
  employees: [],
  singleEmployee: null,
};

export const AddEmployee = (params, token) => async (dispatch) => {
  try {
    const response = await EmployeeService.AddEmployee(params, token);
    if (response.status === 200) {
      toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
      dispatch(stopLoading());
    } else {
      toast.error(response?.message[0], { position: toast.POSITION.TOP_RIGHT });
      dispatch(stopLoading());
    }
  } catch (error) {
    dispatch(stopLoading());
    console.log("error===========>", error);
  }
};

export const GetRoles = (token) => async (dispatch) => {
  try {
    const response = await EmployeeService.getEmployeeRoles(token);
    dispatch(getRoles(response));
  } catch (error) {
    console.log("getRoles error===========>", error);
  }
};

export const GetEmployees = (token) => async (dispatch) => {
  try {
    await EmployeeService.getEmployee(token)
      .then((response) => {
        dispatch(Employee(response?.user_details));
      })
      .catch((err) => {
        console.log("error===========>", err);
      });
  } catch (error) {
    dispatch(stopLoading());
  }
};
export const ResetPassword = (id, token) => async (dispatch) => {
  try {
    await EmployeeService.resetPassword(id, token)
      .then((response) => {
        dispatch(GetEmployees(token));
        toast.success(response?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log("error===========>", err);
      });
  } catch (error) {
    dispatch(stopLoading());
  }
};

export const DeleteEmployee = (id, token) => async (dispatch) => {
  try {
    console.log("idid", id);
    const response = await EmployeeService.DelteEmployee(id, token);
    console.log("response", response);
    toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
    dispatch(GetEmployees(token));
  } catch (error) {
    dispatch(stopLoading());
    console.log("DeleteEmployee error===========>", error);
  }
};

export const GetEmployeeById = (id, token) => async (dispatch) => {
  try {
    await EmployeeService.GetEmployeeId(id, token)
      .then(async (response) => {
        await EmployeeService.getEmployee(token)
          .then((response) => {
            dispatch(Employee(response?.user_details));
          })
          .catch((err) => {
            console.log("error===========>", err);
          });
        dispatch(SingleEmployee(response));
      })
      .catch((err) => {
        console.log("error===========>", err);
      });
    // const response = await EmployeeService.GetEmployeeId( id, token );
    // console.log( 'response', response );
  } catch (error) {
    dispatch(stopLoading());
    console.log("error===========>", error);
  }
};

export const UpdateEmployee = (id, data, token, reset) => async (dispatch) => {
  try {
    const response = await EmployeeService.UpdateEmployee(id, data, token);

    toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });

    await EmployeeService.getEmployee(token)
      .then((response) => {
        console.log("GET EMPLOYEE response", response);
        dispatch(Employee(response?.user_details));
      })
      .catch((err) => {
        console.log("error===========>", err);
      });
  } catch (error) {
    dispatch(stopLoading());
    console.log("Update error===========>", error);
  }
};

export const EmployeeSlice = createSlice({
  name: "Employee",
  initialState,
  reducers: {
    getRoles: (state, action) => {
      state.roles = action.payload;
    },
    Employee: (state, action) => {
      state.employees = action.payload;
    },
    SingleEmployee: (state, action) => {
      state.singleEmployee = action.payload;
    },
  },
});

export const { SingleEmployee, Employee, getRoles } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
