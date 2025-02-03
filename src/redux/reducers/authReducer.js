import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/authActions';

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
    // Login
    .addCase(actions.loginRequest, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    })
    .addCase(actions.loginSuccess, (state, action) => {
      state.isLoading = false;
      state.jwt = action.payload;
      state.success = "Login success";
    })
    .addCase(actions.loginFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Register
    .addCase(actions.registerRequest, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(actions.registerSuccess, (state, action) => {
      state.isLoading = false;
      state.success = "Register Success";
    })
    .addCase(actions.registerFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get User
    .addCase(actions.getUserRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(actions.getUserSuccess, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.favorites = action.payload.favorites;
    })
    .addCase(actions.getUserFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Add to Favorites
    .addCase(actions.addToFavoritesRequest, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(actions.addToFavoritesSuccess, (state, action) => {
      state.isLoading = false;
      state.favorites = state.favorites.some(item => item.id === action.payload.id)
        ? state.favorites.filter(item => item.id !== action.payload.id)
        : [action.payload, ...state.favorites];
    })
    .addCase(actions.addToFavoritesFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Reset Password
    .addCase(actions.resetPasswordRequest, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    })
    .addCase(actions.resetPasswordSuccess, (state, action) => {
      state.isLoading = false;
      state.success = action.payload?.message;
    })
    .addCase(actions.resetPasswordFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Logout
    .addCase(actions.logout, (state) => {
      state.jwt = null;
      state.user = null;
      state.success = "logout success";
      state.favorites = [];
    });
});

export default authReducer;