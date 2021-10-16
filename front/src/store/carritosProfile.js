import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'

export const getCarritosProfile = createAsyncThunk(
  "GET_CARRITOS_PROFILE",
  (id) => {
    return axios
      .get(`${API}/api/cart/historial/${id}`)
      .then((res) => {
        return res.data;
      });
  }
);
const carritosProfileReducer = createReducer([], {
  [getCarritosProfile.fulfilled]: (state, action) => action.payload,
});

export default carritosProfileReducer;
