import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Creators
export const findCartRequest = createAction('cart/findCartRequest');
export const findCartSuccess = createAction('cart/findCartSuccess'); 
export const findCartFailure = createAction('cart/findCartFailure');

export const addItemRequest = createAction('cart/addItemRequest');
export const addItemSuccess = createAction('cart/addItemSuccess');
export const addItemFailure = createAction('cart/addItemFailure');

export const updateCartItemRequest = createAction('cart/updateItemRequest');
export const updateCartItemSuccess = createAction('cart/updateItemSuccess');
export const updateCartItemFailure = createAction('cart/updateItemFailure');

export const removeCartItemRequest = createAction('cart/removeItemRequest');
export const removeCartItemSuccess = createAction('cart/removeItemSuccess');
export const removeCartItemFailure = createAction('cart/removeItemFailure');

export const clearCartRequest = createAction('cart/clearRequest');
export const clearCartSuccess = createAction('cart/clearSuccess');
export const clearCartFailure = createAction('cart/clearFailure');

// Async Actions
export const findCart = (token) => async (dispatch) => {
  dispatch(findCartRequest());
  try {
    const response = await api.get(`/api/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(findCartSuccess(response.data));
  } catch (error) {
    dispatch(findCartFailure(error.message));
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch(addItemRequest());
  try {
    const { data } = await api.put(`/api/cart/add`, reqData.cartItem, {
      headers: {
        Authorization: `Bearer ${reqData.token}`,
      },
    });
    dispatch(addItemSuccess(data));
  } catch (error) {
    dispatch(addItemFailure(error.message));
  }
};

export const updateCartItem = ({data, jwt}) => async (dispatch) => {
  dispatch(updateCartItemRequest());
  try {
    const response = await api.put(`/api/cart-item/update`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateCartItemSuccess(response.data));
  } catch (error) {
    dispatch(updateCartItemFailure(error.message));
  }
};

export const removeCartItem = ({cartItemId, jwt}) => async (dispatch) => {
  dispatch(removeCartItemRequest());
  try {
    const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(removeCartItemSuccess(cartItemId));
  } catch (error) {
    dispatch(removeCartItemFailure(error.message));
  }
};

export const clearCartAction = () => async (dispatch) => {
  dispatch(clearCartRequest());
  try {
    const { data } = await api.put(`/api/cart/clear`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch(clearCartSuccess(data));
  } catch (error) {
    dispatch(clearCartFailure(error.message));
  }
};