import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'


export const getUsers = createAsyncThunk("SEARCH_USERS", () => {
  return axios.get(`${API}/api/users`).then((res) => res.data);
});

//verficar si hay que agregar al estado
const usersReducer = createReducer([], {
  [getUsers.fulfilled]: (state, action) => action.payload,
});

export default usersReducer;
