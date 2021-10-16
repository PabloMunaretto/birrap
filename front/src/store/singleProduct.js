import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'

export const getProduct = createAsyncThunk("SEARCH_SINGLEPRODUCT", (productId) => {
  return axios.get(`${API}/api/product/${productId}`).then((res) => res.data);
});

export const updateProduct = createAsyncThunk("PUT", (product) => {
  return axios({
    method: "put",
    url: `/api/product/${product.id}`,
    data: { product }, //-------revisar-------
  }).then(product => product);
});

export const deleteProduct = createAsyncThunk("DELETE", (id) => {
  return axios({
    method: "delete",
    url: `/api/product/${id}`,
  }).then(product => product);
});
//verficar si hay que agregar al estado
const singleProductReducer = createReducer({}, {
  [getProduct.fulfilled]: (state, action) => action.payload,
  [updateProduct.fulfilled]: (state, action) => [...state, action.payload],
});

export default singleProductReducer;
