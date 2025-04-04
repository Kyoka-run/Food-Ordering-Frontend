import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/orderActions';
import { logout } from '../actions/authActions';

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const orderReducer = createReducer(initialState, (builder) => {
  builder
    // Create Order
    .addCase(actions.createOrderRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.createOrderSuccess, (state, action) => {
      state.loading = false;
      state.orders = [...state.orders, action.payload];
    })
    .addCase(actions.createOrderFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get User Orders
    .addCase(actions.getUserOrdersRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getUserOrdersSuccess, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(actions.getUserOrdersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(logout, (state) => {
      state.orders = [];
    });
});

export default orderReducer;