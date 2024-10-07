import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import BankServices from "../../Services/bank.services";

const initialState = {
    banks: [],

};

export const AddBank = (data, token) => async (dispatch) => {
    try {
        const response = await BankServices.AddBank(data, token);
     
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
          
          await  dispatch(GetBanks(token));
        } else {
            toast.error(response?.detail, { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
        console.log("AddBank error===========>", error)
    };
};

export const GetBanks = (token) => async (dispatch) => {
    try {
        const response = await BankServices.GetBanks(token);
        dispatch(Banks(response));
        return response;
    } catch (error) {
        console.log("GetBanks error===========>", error)
    };
};

export const DeleteBank = (id, token) => async (dispatch) => {
    try {
        const response = await BankServices.DeleteBank(id, token);
        console.log(response);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            await  dispatch(GetBanks(token));
        } else {
        
            toast.error(response?.detail, { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        console.log("DeleteBank error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};



export const EditBank = (id, data, token, ) => async (dispatch) => {
    try {
        const response = await BankServices.EditBank(id, data, token);
        if (response.status === 200) {
            toast.success(response?.message, { position: toast.POSITION.TOP_RIGHT });
            dispatch(GetBanks(token));
          
        } else {
            toast.error(response?.detail, { position: toast.POSITION.TOP_RIGHT });
        };
        return response;
    } catch (error) {
        console.log("EditBank error===========>", error)
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    };
};

export const BankSlice = createSlice({
    name: "BankSlice",
    initialState,
    reducers: {
        Banks: (state, action) => {
            state.banks = action.payload
        },
        
    },
});

export const {
    Banks
} = BankSlice.actions;

export default BankSlice.reducer;