import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import CategoryService from "../../Services/category.services";

const initialState = {
    category: []
}

export const GetCategory = (token) => async (dispatch) => {
    try {
        const response = await CategoryService.getCategory(token);
        dispatch(Category(response));
    } catch (error) {
        console.log("error===========>", error)
    };
};

export const CategorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        Category: (state, action) => {
            state.category = action.payload
        },
    },
});

export const {
    Category
} = CategorySlice.actions;

export default CategorySlice.reducer;