import { createReducer } from '@reduxjs/toolkit';
import { 
  loginRequest, 
  loginSuccess, 
  loginFailure,
  getUserSuccess,
  logoutUser
} from '../actions/authActions';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  favorites: [],
  success: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginSuccess, (state, action) => {
      state.isLoading = false;
      state.jwt = action.payload;
      state.success = "Login success";
    })
    .addCase(loginFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getUserSuccess, (state, action) => {
      state.user = action.payload;
      state.favorites = action.payload.favorites;
    })
    .addCase(logoutUser, (state) => {
      state.jwt = null;
      state.user = null;
      state.success = "logout success";
      localStorage.removeItem("jwt");
    });
});

export default authReducer;