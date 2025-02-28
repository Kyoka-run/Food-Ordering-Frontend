import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';
import { findCart } from "./cartActions";
import { getRestaurantByUserId } from "./restaurantActions";
import toast from 'react-hot-toast';

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
    reqData.navigate("/");

    dispatch(loginSuccess(data.jwtToken));
    dispatch(getUser(data.jwtToken));
    dispatch(findCart(data.jwtToken));

    toast.success("Logged in successfully");

    if (data.roles.includes("ROLE_RESTAURANT_OWNER")) {
      dispatch(getRestaurantByUserId(data.jwtToken));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    toast.error(error?.response?.data?.message || "Login failed");
  }
};

export const registerUser = (sendData) => async (dispatch) => {
  try {
    sendData.setLoader(true);
    const { data } = await api.post("/auth/signup", sendData.userData);
    dispatch(registerSuccess());
    sendData.reset();
    toast.success(data?.message || "User Registered Successfully");
    sendData.navigate("/login");
  } catch (error) {
    dispatch(registerFailure(error.message));
    toast.error(error?.response?.data?.message || error?.response?.data?.password || "Registration failed");
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
    toast.error("Failed to fetch user profile");
  }
};

export const addToFavorites = ({restaurantId, jwt}) => async (dispatch) => {
  dispatch(addToFavoritesRequest());
  try {
    const { data } = await api.put(
      `/restaurants/${restaurantId}/add-favorites`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(addToFavoritesSuccess(data));
    toast.success("Favorites updated successfully");
  } catch (error) {
    dispatch(addToFavoritesFailure(error.message));
    toast.error("Failed to update favorites");
  }
};

export const resetPasswordRequestAction = (email) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const { data } = await api.post(`/auth/reset-password-request?email=${email}`, {});
    dispatch(resetPasswordSuccess(data));
    toast.success("Password reset link sent to your email");
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
    toast.error("Failed to send reset password link");
  }
};

export const resetPassword = (reqData) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const { data } = await api.post(`/auth/reset-password`, reqData.data);
    reqData.navigate("/password-change-success");
    dispatch(resetPasswordSuccess(data));
    toast.success("Password changed successfully");
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
    toast.error("Failed to reset password");
  }
};

export const logoutUser = (navigate) => (dispatch) => {
  dispatch(logout());
  toast.success("Logged out successfully");
};