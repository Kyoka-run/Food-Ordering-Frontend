import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/superAdminActions';

const initialState = {
  customers: [],
  pendingCustomers: [],
  loading: false,
  error: null
};

const superAdminReducer = createReducer(initialState, (builder) => {
  builder
    // Get Customers
    .addCase(actions.getCustomersRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getCustomersSuccess, (state, action) => {
      state.loading = false;
      state.customers = action.payload;
    })
    .addCase(actions.getCustomersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
});

export default superAdminReducer;