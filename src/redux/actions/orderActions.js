import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Creators
export const createOrderRequest = createAction('order/createRequest');
export const createOrderSuccess = createAction('order/createSuccess');
export const createOrderFailure = createAction('order/createFailure');

export const getUserOrdersRequest = createAction('order/getUserOrdersRequest');
export const getUserOrdersSuccess = createAction('order/getUserOrdersSuccess');
export const getUserOrdersFailure = createAction('order/getUserOrdersFailure');

export const getNotificationsRequest = createAction('order/getNotificationsRequest');
export const getNotificationsSuccess = createAction('order/getNotificationsSuccess');
export const getNotificationsFailure = createAction('order/getNotificationsFailure');

// Async Actions
export const createOrder = ({ order, jwt }) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const { data } = await api.post('/api/order', order, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if(data.payment_url) {
      window.location.href = data.payment_url;
    }
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFailure(error.message));
  }
};

export const getUserOrders = (jwt) => async (dispatch) => {
  dispatch(getUserOrdersRequest());
  try {
    const { data } = await api.get(`/api/order/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getUserOrdersSuccess(data));
  } catch (error) {
    dispatch(getUserOrdersFailure(error.message));
  }
};

export const getUsersNotification = () => async (dispatch) => {
  dispatch(getNotificationsRequest());
  try {
    const { data } = await api.get('/api/notifications');
    dispatch(getNotificationsSuccess(data));
  } catch (error) {
    dispatch(getNotificationsFailure(error.message));
  }
};