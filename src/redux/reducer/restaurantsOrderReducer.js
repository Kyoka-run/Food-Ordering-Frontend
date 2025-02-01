import { createReducer } from '@reduxjs/toolkit';
import {
  getRestaurantsOrderRequest,
  getRestaurantsOrderSuccess,
  getRestaurantsOrderFailure,
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
  updateOrderStatusFailure
} from '../actions/restaurantsOrderActions';

const initialState = {
  loading: false,
  error: null,
  orders: []
};

const restaurantsOrderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getRestaurantsOrderRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getRestaurantsOrderSuccess, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(getRestaurantsOrderFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateOrderStatusRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateOrderStatusSuccess, (state, action) => {
      state.loading = false;
      state.orders = state.orders.map((order) =>
        order.id === action.payload.id ? action.payload : order
      );
    })
    .addCase(updateOrderStatusFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default restaurantsOrderReducer;
