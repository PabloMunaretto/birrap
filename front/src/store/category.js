import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'


export const getCategory = createAsyncThunk("SEARCH_CATEGORY", (id) => {
  return axios.get(`${API}/api/category/${id}`).then((res) => res.data);
});

const categoryReducer = createReducer({}, {
  [getCategory.fulfilled]: (state, action) => action.payload,
});

export default categoryReducer;
