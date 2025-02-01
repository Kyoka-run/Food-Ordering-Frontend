import { createReducer } from '@reduxjs/toolkit';
import {
  getCustomersRequest,
  getCustomersSuccess,
  getCustomersFailure,
  getPendingCustomersRequest,
  getPendingCustomersSuccess,
  getPendingCustomersFailure
} from '../actions/superAdminActions';

const initialState = {
  customers: [],
  pendingCustomers: [],
  loading: false,
  error: null
};

const superAdminReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCustomersRequest, (state) => {
      state.loading = true;
    })
    .addCase(getCustomersSuccess, (state, action) => {
      state.loading = false;
      state.customers = action.payload;
    })
    .addCase(getCustomersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getPendingCustomersRequest, (state) => {
      state.loading = true;
    })
    .addCase(getPendingCustomersSuccess, (state, action) => {
      state.loading = false;
      state.pendingCustomers = action.payload;
    })
    .addCase(getPendingCustomersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default superAdminReducer;