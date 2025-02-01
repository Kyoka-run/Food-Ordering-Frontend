import { createReducer } from '@reduxjs/toolkit';
import {
  createMenuItemRequest,
  createMenuItemSuccess,
  createMenuItemFailure,
  getMenuItemsRequest,
  getMenuItemsSuccess,
  getMenuItemsFailure,
  updateMenuItemAvailabilityRequest,
  updateMenuItemAvailabilitySuccess,
  updateMenuItemAvailabilityFailure
} from '../actions/menuActions';

const initialState = {
  menuItems: [],
  loading: false,
  error: null,
  search: [],
  message: null
};

const menuReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createMenuItemRequest, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })
    .addCase(createMenuItemSuccess, (state, action) => {
      state.loading = false;
      state.menuItems = [...state.menuItems, action.payload];
      state.message = "Food Created Successfully";
    })
    .addCase(createMenuItemFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getMenuItemsRequest, (state) => {
      state.loading = true;
    })
    .addCase(getMenuItemsSuccess, (state, action) => {
      state.loading = false;
      state.menuItems = action.payload;
    })
    .addCase(getMenuItemsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default menuReducer;