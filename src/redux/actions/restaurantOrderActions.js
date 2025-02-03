import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Creators
export const getRestaurantOrdersRequest = createAction('restaurantOrder/getOrdersRequest');
export const getRestaurantOrdersSuccess = createAction('restaurantOrder/getOrdersSuccess');
export const getRestaurantOrdersFailure = createAction('restaurantOrder/getOrdersFailure');

export const updateOrderStatusRequest = createAction('restaurantOrder/updateStatusRequest');
export const updateOrderStatusSuccess = createAction('restaurantOrder/updateStatusSuccess');
export const updateOrderStatusFailure = createAction('restaurantOrder/updateStatusFailure');

// Async Actions
export const updateOrderStatus = ({orderId, orderStatus, jwt}) => async (dispatch) => {
  dispatch(updateOrderStatusRequest());
  try {
    const response = await api.put(
      `/api/admin/orders/${orderId}/${orderStatus}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(updateOrderStatusSuccess(response.data));
  } catch (error) {
    dispatch(updateOrderStatusFailure(error.message));
  }
};

export const fetchRestaurantsOrder = ({restaurantId, orderStatus, jwt}) => async (dispatch) => {
  dispatch(getRestaurantOrdersRequest());
  try {
    const { data } = await api.get(
      `/api/admin/order/restaurant/${restaurantId}`,
      {
        params: { order_status: orderStatus},
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(getRestaurantOrdersSuccess(data));
  } catch (error) {
    dispatch(getRestaurantOrdersFailure(error.message));
  }
};