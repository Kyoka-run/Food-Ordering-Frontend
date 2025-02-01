import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

export const createOrderRequest = createAction('order/createRequest');
export const createOrderSuccess = createAction('order/createSuccess');
export const createOrderFailure = createAction('order/createFailure');

export const getUserOrdersRequest = createAction('order/getUserOrdersRequest');
export const getUserOrdersSuccess = createAction('order/getUserOrdersSuccess');
export const getUserOrdersFailure = createAction('order/getUserOrdersFailure');

export const createOrder = (reqData) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const {data} = await api.post('/api/order', reqData.order, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
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