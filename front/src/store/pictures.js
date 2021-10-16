import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'

export const getPictures = createAsyncThunk("SEARCH_PICTURES", (productId) => {
    return axios.get(`${API}/api/pictures/${productId}`)
    .then((res) => res.data);
});

const picturesReducer = createReducer([], {
  [getPictures.fulfilled]: (state, action) => action.payload,
});

export default picturesReducer;