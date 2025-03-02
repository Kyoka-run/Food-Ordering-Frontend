import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';
import toast from 'react-hot-toast';

// Action Creators
export const createOrderRequest = createAction('order/createRequest');
export const createOrderSuccess = createAction('order/createSuccess');
export const createOrderFailure = createAction('order/createFailure');

export const getUserOrdersRequest = createAction('order/getUserOrdersRequest');
export const getUserOrdersSuccess = createAction('order/getUserOrdersSuccess');
export const getUserOrdersFailure = createAction('order/getUserOrdersFailure');

// Async Actions
export const createOrder = ({ order, jwt }) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const { data } = await api.post('/order', order, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if(data.payment_url) {
      window.location.href = data.payment_url;
    }
    dispatch(createOrderSuccess(data));
    toast.success('Order placed successfully');
  } catch (error) {
    dispatch(createOrderFailure(error.message));
    toast.error('Failed to place order');
  }
};

export const getUserOrders = (jwt) => async (dispatch) => {
  dispatch(getUserOrdersRequest());
  try {
    const { data } = await api.get(`/order/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getUserOrdersSuccess(data));
  } catch (error) {
    dispatch(getUserOrdersFailure(error.message));
    toast.error('Failed to load your orders');
  }
};