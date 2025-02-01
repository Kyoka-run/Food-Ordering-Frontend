import { createReducer } from '@reduxjs/toolkit';
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  getUserOrdersRequest,
  getUserOrdersSuccess,
  getUserOrdersFailure
} from '../actions/orderActions';

const initialState = {
  loading: false,
  orders: [],
  error: null,
  notifications: []
};

const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createOrderRequest, (state) => {
      state.loading = true;
    })
    .addCase(createOrderSuccess, (state, action) => {
      state.loading = false;
      state.orders = [...state.orders, action.payload];
    })
    .addCase(createOrderFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getUserOrdersRequest, (state) => {
      state.loading = true;
    })
    .addCase(getUserOrdersSuccess, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(getUserOrdersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default orderReducer;