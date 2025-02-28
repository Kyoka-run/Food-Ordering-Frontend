import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';
import { getUser } from './authActions';
import toast from 'react-hot-toast';

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
    const response = await api.get(`/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(findCartSuccess(response.data));
  } catch (error) {
    dispatch(findCartFailure(error.message));
    toast.error("Failed to load cart");
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch(addItemRequest());
  try {
    const { data } = await api.put(`/cart/add`, reqData.cartItem, {
      headers: {
        Authorization: `Bearer ${reqData.token}`,
      },
    });
    dispatch(addItemSuccess(data));
    toast.success("Item added to cart");
  } catch (error) {
    dispatch(addItemFailure(error.message));
    toast.error("Failed to add item to cart");
  }
};

export const updateCartItem = ({data, jwt}) => async (dispatch) => {
  dispatch(updateCartItemRequest());
  try {
    const response = await api.put(`/cart-item/update`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateCartItemSuccess(response.data));
    toast.success("Cart updated");
  } catch (error) {
    dispatch(updateCartItemFailure(error.message));
    toast.error("Failed to update cart");
  }
};

export const removeCartItem = ({cartItemId, jwt}) => async (dispatch) => {
  dispatch(removeCartItemRequest());
  try {
    await api.delete(`/cart-item/${cartItemId}/remove`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(removeCartItemSuccess(cartItemId));
    toast.success("Item removed from cart");
  } catch (error) {
    dispatch(removeCartItemFailure(error.message));
    toast.error("Failed to remove item from cart");
  }
};

export const clearCartAction = () => async (dispatch) => {
  dispatch(clearCartRequest());
  try {
    const jwt = localStorage.getItem("jwt");
    const { data } = await api.put(`/cart/clear`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(clearCartSuccess(data));
    dispatch(getUser(jwt));
    toast.success("Cart cleared");
  } catch (error) {
    dispatch(clearCartFailure(error.message));
    toast.error("Failed to clear cart");
  }
};