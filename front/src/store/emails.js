import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from './store'

export const sendEmailToUser = createAsyncThunk("SEND_EMAIL_TO_USER", (emailData) => {
    const { email, subject, text } = emailData
    
    return axios({
        method: "post",
        url: `${API}/send-email`,
        data: { email, subject, text },
    }).then(email => email);
}
);
export const sendEmailToAdmin = createAsyncThunk("SEND_EMAIL_TO_ADMIN", (emailData) => {
  const { email } = emailData
  return axios({
      method: "post",
      url: `${API}/send-email`,
      data: { email },
  }).then(email => email);
}
);

const emailReducer = createReducer([], {
  [sendEmailToUser.fulfilled]: (state, action) => action.payload,
  [sendEmailToAdmin.fulfilled]: (state, action) => action.payload,
});

export default emailReducer;