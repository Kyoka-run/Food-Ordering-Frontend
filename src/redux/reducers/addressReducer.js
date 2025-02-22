import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/addressActions';

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  selectedAddress: null
};

const addressReducer = createReducer(initialState, (builder) => {
  builder
    // Get User Addresses
    .addCase(actions.getUserAddressesRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getUserAddressesSuccess, (state, action) => {
      state.loading = false;
      state.addresses = action.payload;
    })
    .addCase(actions.getUserAddressesFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Create Address
    .addCase(actions.createAddressRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.createAddressSuccess, (state, action) => {
      state.loading = false;
      state.addresses = [...state.addresses, action.payload];
    })
    .addCase(actions.createAddressFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Address
    .addCase(actions.updateAddressRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.updateAddressSuccess, (state, action) => {
      state.loading = false;
      state.addresses = state.addresses.map(address => 
        address.addressId === action.payload.addressId ? action.payload : address
      );
    })
    .addCase(actions.updateAddressFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete Address
    .addCase(actions.deleteAddressRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.deleteAddressSuccess, (state, action) => {
      state.loading = false;
      state.addresses = state.addresses.filter(
        address => address.addressId !== action.payload
      );
    })
    .addCase(actions.deleteAddressFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default addressReducer;