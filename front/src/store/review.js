import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'


export const writeReview = createAsyncThunk("CREATE_REVIEW", (data) => {
    return axios
    .post(`${API}/api/reviews/${data.productId}`, data)
    .then(res => res.data)
  });

  const reviewReducer = createReducer({}, {
    [writeReview.fulfilled]: (state, action) => action.payload
  });
  
export default reviewReducer;