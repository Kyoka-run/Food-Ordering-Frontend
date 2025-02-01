import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Creators
export const loginRequest = createAction('auth/loginRequest');
export const loginSuccess = createAction('auth/loginSuccess');
export const loginFailure = createAction('auth/loginFailure');
export const getUserSuccess = createAction('auth/getUserSuccess');
export const logoutUser = createAction('auth/logout');

// Async Actions
export const loginUser = (reqData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await api.post(`/auth/signin`, reqData.data);
    if(data.jwt) localStorage.setItem("jwt", data.jwt);
    
    if(data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    
    dispatch(loginSuccess(data.jwt));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const getUser = (token) => async (dispatch) => {
  try {
    const response = await api.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(getUserSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};