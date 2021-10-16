import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'

export const getCategories = createAsyncThunk("SEARCH_CATEGORIES", () => {
  return axios.get(`${API}/api/category`).then((res) => res.data);
});

export const postCategories = createAsyncThunk("POST_CATEGORIES", (categories) => {
  return axios({
    method: "post",
    url: "?",
    data: {},
  }).then(categoria => categoria);
});

export const deleteCategories = createAsyncThunk("DELETE_CATEGORIES", (categories) => {
  return axios({
    method: "delete",
    url: "?",
    data: {},
  }).then(categoria => categoria);
});

const categoriesReducer = createReducer([], {
  [getCategories.fulfilled]: (state, action) => action.payload,
  [postCategories.fulfilled]: (state, action) => [...state, action.payload],
});

export default categoriesReducer;
