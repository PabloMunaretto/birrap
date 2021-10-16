import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'

export const deleteItemFromCarrito = createAsyncThunk(
  "DELETE_ITEM_FROM_CARRITO",
  (ids) => {
    const { productId, cartId } = ids;
    return axios({
      method: "delete",
      url: `${API}/api/items/${productId}/${cartId}`,
    }).then((item) => item);
  }
);

export const getItemFromCarrito = createAsyncThunk(
  "GET_ITEM_FROM_CARRITO",
  (ids) => {
    const { productId, cartId } = ids;
    return axios
      .get(`${API}/api/items/${productId}/${cartId}`)
      .then((res) => res.data);
  }
);

export const addItemToCarrito = createAsyncThunk(
  "ADD_ITEM_TO_CARRITO",
  (itemData) => {
    const { cartId, productId, qty } = itemData;

    return axios({
      method: "post",
      url: `${API}/api/items`,
      data: { cartId, productId, qty },
    }).then((item) => item);
  }
);

export const modifyItem = createAsyncThunk("MODIFY_ITEM", (itemData) => {
  const cartId = itemData.cartId;
  const productId = itemData.productId;
  const operation = itemData.operation;
  // console.log("redux", itemData) FLAMU

  return axios({
    method: "put",
    url: `${API}/api/items/${productId}/${cartId}`,
    data: { operation },
  }).then((product) => product);
});

const itemsReducer = createReducer([], {
  [deleteItemFromCarrito.fulfilled]: (state, action) => action.payload,
  [getItemFromCarrito.fulfilled]: (state, action) => action.payload,
  [modifyItem.fulfilled]: (state, action) => action.payload,
});

export default itemsReducer;

//--------  REVISAR!!!! --------- //
