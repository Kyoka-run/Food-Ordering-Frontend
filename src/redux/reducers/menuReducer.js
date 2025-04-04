import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/menuActions';
import { logout } from '../actions/authActions';

const initialState = {
  menuItems: [],
  loading: false,
  error: null,
  search: [],
  message: null
};

const menuReducer = createReducer(initialState, (builder) => {
  builder
    // Create Menu Item
    .addCase(actions.createMenuItemRequest, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })
    .addCase(actions.createMenuItemSuccess, (state, action) => {
      state.loading = false;
      state.menuItems = [...state.menuItems, action.payload];
      state.message = "Food Created Successfully";
    })
    .addCase(actions.createMenuItemFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get Menu Items
    .addCase(actions.getMenuItemsRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.getMenuItemsSuccess, (state, action) => {
      state.loading = false;
      state.menuItems = action.payload;
    })
    .addCase(actions.getMenuItemsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Search Menu Items
    .addCase(actions.searchMenuItemRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.searchMenuItemSuccess, (state, action) => {
      state.loading = false;
      state.search = action.payload;
    })
    .addCase(actions.searchMenuItemFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Menu Item Availability
    .addCase(actions.updateMenuItemAvailabilityRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.updateMenuItemAvailabilitySuccess, (state, action) => {
      state.loading = false;
      state.menuItems = state.menuItems.map(item => 
        item.foodId === action.payload.foodId ? action.payload : item
      );
    })
    .addCase(actions.updateMenuItemAvailabilityFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete Menu Item
    .addCase(actions.deleteMenuItemSuccess, (state, action) => {
      state.menuItems = state.menuItems.filter(item => item.foodId !== action.payload);
    })
    
    // Update Menu Item
    .addCase(actions.updateMenuItemRequest, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })
    .addCase(actions.updateMenuItemSuccess, (state, action) => {
      state.loading = false;
      state.menuItems = state.menuItems.map(item =>
        item.foodId === action.payload.foodId ? action.payload : item
      );
      state.message = "Menu Item Updated Successfully";
    })
    .addCase(actions.updateMenuItemFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(actions.logout, (state) => {
      state.menuItems = [];
      state.search = [];
    });
});

export default menuReducer;