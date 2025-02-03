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

    // Get Pending Customers
    .addCase(actions.getPendingCustomersRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getPendingCustomersSuccess, (state, action) => {
      state.loading = false;
      state.pendingCustomers = action.payload;
    })
    .addCase(actions.getPendingCustomersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Approve Customer
    .addCase(actions.approveCustomerRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.approveCustomerSuccess, (state, action) => {
      state.loading = false;
      state.pendingCustomers = state.pendingCustomers.filter(
        customer => customer.id !== action.payload.id
      );
      state.customers = [...state.customers, action.payload];
    })
    .addCase(actions.approveCustomerFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Reject Customer
    .addCase(actions.rejectCustomerRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.rejectCustomerSuccess, (state, action) => {
      state.loading = false;
      state.pendingCustomers = state.pendingCustomers.filter(
        customer => customer.id !== action.payload.id
      );
    })
    .addCase(actions.rejectCustomerFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default superAdminReducer;