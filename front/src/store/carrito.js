import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API } from './store'

export const getCarrito = createAsyncThunk("GET_CARRITO", (id) => {
  return axios.get(`${API}/api/cart/${id}`).then((res) => {
    return res.data;
  });
});

// --------- Revisar como se crea el carrito en la ruta del backEnd -----------
export const postCarrito = createAsyncThunk("POST_CARRITO", (carrito) => {
  const paymentMethod = carrito.paymentMethod;
  const table = carrito.table;
  const state = carrito.state;
  return axios({
    method: "post",
    url: `${API}/api/cart/${carrito.id}`,
    data: { paymentMethod, table, state },
  }).then((product) => product.data);
});

export const deleteCarrito = createAsyncThunk("DELETE_CARRITO", (id) => {
  return axios({
    method: "delete",
    url: `/api/cart/${id}`,
  }).then((product) => product.data);
});

export const updateCarrito = createAsyncThunk("UPDATE_CARRITO", (cart) => {
  const { state, total, paymentMethod, table } = cart;
  return axios({
    method: "put",
    url: `${API}/api/cart/${cart.id}`,
    data: { state, total, paymentMethod, table },
  }).then(() => ({}));
  // El update no devuelve nada para setear el estado. Asi que lo seteamos vacio cuando compra.
});

const carritoReducer = createReducer(
  {},
  {
    [getCarrito.fulfilled]: (state, action) => action.payload,
    [postCarrito.fulfilled]: (state, action) => [...state, action.payload],
    [updateCarrito.fulfilled]: (state, action) => action.payload,
  }
);

export default carritoReducer;
