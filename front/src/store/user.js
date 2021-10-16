import {
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'

/** para hacer un pedido get con jwt a veces es necesario
 * enviar un header de autentificacion para autorizar
 */

export const registerUser = createAsyncThunk("CREATE_USER", (user) => {
  return axios
    .post(`${API}/api/register`, user)
    .then((res) => res.data)
    .then((usuario) => usuario);
});

export const loginUser = createAsyncThunk("LOGIN_USER", (user) => {
  console.log("API-----------------------------------", `${API}/api/login`)
  return axios({
    method: "post",
    url: `${API}/api/login`,
    data: user,
  })
    .then((user) => localStorage.setItem("token", user.data))
    .catch();
});

export const getUser = createAsyncThunk("SEARCH_SINGLE_USER", () => {
  return axios
    .get(`${API}/api/me`, {
      headers: { Authorization: `token ${localStorage.getItem("token")}` },
    })
    .then((res) => res.data);
});

export const logFbUser = createAsyncThunk("SEARCH_SINGLE_FBUSER", (response) => {
  const user= {
    firstName: response.name.split(" ")[0],
    lastName: response.name.split(" ")[1],
    email: response.email,
    password: "facebook"   
  }

  return axios
    .post(`${API}/api/register/fb`, user)
    .then((res) => {return res.data})
    .then((usuario) => localStorage.setItem("id", usuario.id));
  }
);

export const getFbUser = createAsyncThunk("SEARCH_SINGLE_USER", (id) => {
  return axios
    .get(`${API}/api/users/${id}`)
    .then((res) => res.data);
});

export const logOutUser = createAsyncThunk("SET_LOG_OUT", () => null);

const userReducer = createReducer({},
  {
    [loginUser.fulfilled]: (state, action) => action.payload,
    [getUser.fulfilled]: (state, action) => action.payload,
    [logOutUser.fulfilled]: (state, action) => action.payload,
    [logFbUser.fulfilled]: (state, action) => action.payload,
    [getFbUser.fulfilled]: (state, action) => action.payload,
  }
);

export default userReducer;
