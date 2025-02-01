import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

export const getRestaurantsOrderRequest = createAction('restaurantsOrder/getRequest');
export const getRestaurantsOrderSuccess = createAction('restaurantsOrder/getSuccess');
export const getRestaurantsOrderFailure = createAction('restaurantsOrder/getFailure');

export const updateOrderStatusRequest = createAction('restaurantsOrder/updateStatusRequest');
export const updateOrderStatusSuccess = createAction('restaurantsOrder/updateStatusSuccess');
export const updateOrderStatusFailure = createAction('restaurantsOrder/updateStatusFailure');

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
  dispatch(getRestaurantsOrderRequest());
  try {
    const { data } = await api.get(
      `/api/admin/order/restaurant/${restaurantId}`,
      {
        params: { order_status: orderStatus },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(getRestaurantsOrderSuccess(data));
  } catch (error) {
    dispatch(getRestaurantsOrderFailure(error.message));
  }
};