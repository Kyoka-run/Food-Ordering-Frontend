// redux/actions/authActions.js
import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Creators
export const loginRequest = createAction('auth/loginRequest');
export const loginSuccess = createAction('auth/loginSuccess');
export const loginFailure = createAction('auth/loginFailure');

export const registerRequest = createAction('auth/registerRequest');
export const registerSuccess = createAction('auth/registerSuccess');
export const registerFailure = createAction('auth/registerFailure');

export const getUserRequest = createAction('auth/getUserRequest');
export const getUserSuccess = createAction('auth/getUserSuccess');
export const getUserFailure = createAction('auth/getUserFailure');

export const addToFavoritesRequest = createAction('auth/addToFavoritesRequest');
export const addToFavoritesSuccess = createAction('auth/addToFavoritesSuccess');
export const addToFavoritesFailure = createAction('auth/addToFavoritesFailure');

export const resetPasswordRequest = createAction('auth/resetPasswordRequest');
export const resetPasswordSuccess = createAction('auth/resetPasswordSuccess');
export const resetPasswordFailure = createAction('auth/resetPasswordFailure');

export const logout = createAction('auth/logout');

// Async Actions
export const loginUser = (reqData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await api.post(`/auth/signin`, reqData.data);
    if(data.jwtToken) localStorage.setItem("jwt", data.jwtToken);
    
    if(data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch(loginSuccess(data.jwtToken));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const registerUser = (sendData) => async (dispatch) => {
  try {
    sendData.setLoader(true);
    const { data } = await api.post("/auth/signup", sendData);
    sendData.reset();
    sendData.toast.success(data?.message || "User Registered Successfully");
    sendData.navigate("/login");
  } catch (error) {
    sendData.toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
  } finally {
    sendData.setLoader(false);
  }
};

export const getUser = (token) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await api.get(`/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(getUserSuccess(response.data));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const addToFavorites = ({restaurantId, jwt}) => async (dispatch) => {
  dispatch(addToFavoritesRequest());
  try {
    const { data } = await api.put(
      `api/restaurants/${restaurantId}/add-favorites`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(addToFavoritesSuccess(data));
  } catch (error) {
    dispatch(addToFavoritesFailure(error.message));
  }
};

export const resetPasswordRequestAction = (email) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const { data } = await api.post(`/auth/reset-password-request?email=${email}`, {});
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
  }
};

export const resetPassword = (reqData) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const { data } = await api.post(`/auth/reset-password`, reqData.data);
    reqData.navigate("/password-change-success");
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
  }
};

export const logoutUser = (navigate) => (dispatch) => {
  dispatch(logout());
  localStorage.removeItem("jwt");
};