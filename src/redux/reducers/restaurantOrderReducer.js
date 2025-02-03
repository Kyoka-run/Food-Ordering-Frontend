import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/restaurantOrderActions';

const initialState = {
  loading: false,
  error: null,
  orders: []
};

const restaurantOrderReducer = createReducer(initialState, (builder) => {
  builder
    // Get Restaurant Orders
    .addCase(actions.getRestaurantOrdersRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getRestaurantOrdersSuccess, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(actions.getRestaurantOrdersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Order Status
    .addCase(actions.updateOrderStatusRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.updateOrderStatusSuccess, (state, action) => {
      state.loading = false;
      state.orders = state.orders.map((order) => 
        order.id === action.payload.id ? action.payload : order
      );
    })
    .addCase(actions.updateOrderStatusFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default restaurantOrderReducer;