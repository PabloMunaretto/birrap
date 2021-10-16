import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'

export const getProducts = createAsyncThunk("SEARCH_PRODUCT", () => {
  return axios.get(`${API}/api/product`).then((res) => res.data);
});

export const postProduct = createAsyncThunk("CREATE_PRODUCT", () => {
  return axios
    .post(`${API}/api/product`)
    .then((res) => res.data);
});

export const putProduct = createAsyncThunk("EDIT_PRODUCT", () => {
  return axios
    .put(`${API}/api/product/:id`)
    .then((res) => res.data);
});

export const deleteProduct = createAsyncThunk("DELETE_PRODUCT", () => {
  return axios
    .delete(`${API}/api/product/:id`)
    .then((res) => res.data);
});

export const postProducts = createAsyncThunk("POST", (products) => {
  const name = products.name;
  const description = products.description;
  const price = products.price;
  const stock = products.stock;
  const stars = products.stars;
  // const category_id = products.category_id
  // const picture_id = procucts.picture_id
  return axios({
    method: "post",
    url: `/api/product/${products.id}`, //comentar manana
    data: { name, description, price, stock, stars },
  }).then((product) => product);
});

export const getProductName = createAsyncThunk(
  "SEARCH_PRODUCT_NAME",
  (name) => {
    return axios
      .get(`${API}/api/product/name/${name}`)
      .then((res) => res.data)
      .catch(console.log("error"));
  }
);
export const getProductByCategorie = createAsyncThunk(
  "SEARCH_PRODUCT_CATEGORIE",
  (id) => {
    return axios
      .get(`${API}/api/product/category/${id}`)
      .then((res) => res.data);
  }
);

//verficar si hay que agregar al estado
const productsReducer = createReducer([], {
  [getProducts.fulfilled]: (state, action) => action.payload,
  [postProducts.fulfilled]: (state, action) => [...state, action.payload],
  [getProductName.fulfilled]: (state, action) => action.payload,
  [getProductByCategorie.fulfilled]: (state, action) => action.payload,
});

export default productsReducer;
