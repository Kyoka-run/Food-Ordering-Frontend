import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

export const findCartRequest = createAction('cart/findRequest');
export const findCartSuccess = createAction('cart/findSuccess');
export const findCartFailure = createAction('cart/findFailure');

export const addItemRequest = createAction('cart/addItemRequest');
export const addItemSuccess = createAction('cart/addItemSuccess');
export const addItemFailure = createAction('cart/addItemFailure');

export const updateCartItemRequest = createAction('cart/updateItemRequest');
export const updateCartItemSuccess = createAction('cart/updateItemSuccess');
export const updateCartItemFailure = createAction('cart/updateItemFailure');

export const clearCartRequest = createAction('cart/clearRequest');
export const clearCartSuccess = createAction('cart/clearSuccess');
export const clearCartFailure = createAction('cart/clearFailure');

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