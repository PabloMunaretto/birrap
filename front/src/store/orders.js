import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'

export const getOrders = createAsyncThunk("SEARCH_ORDERS", () => {
  return axios.get(`${API}/api/cart`).then((res) => res.data);
});

//verficar si hay que agregar al estado
const ordersReducer = createReducer([], {
  [getOrders.fulfilled]: (state, action) => action.payload,
});

export default ordersReducer;