import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/orderActions';

const initialState = {
  loading: false,
  orders: [],
  error: null,
  notifications: []
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

    // Get Notifications
    .addCase(actions.getNotificationsRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.getNotificationsSuccess, (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    })
    .addCase(actions.getNotificationsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default orderReducer;