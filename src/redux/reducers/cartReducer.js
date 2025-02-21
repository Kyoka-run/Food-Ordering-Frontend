import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/cartActions';
import { logout } from '../actions/authActions';

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    // Find Cart
    .addCase(actions.findCartRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.findCartSuccess, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.cartItems = action.payload.items;
    })
    .addCase(actions.findCartFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Add Item to Cart
    .addCase(actions.addItemRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.addItemSuccess, (state, action) => {
      state.loading = false;
      state.cartItems = [action.payload, ...state.cartItems];
    })
    .addCase(actions.addItemFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Cart Item
    .addCase(actions.updateCartItemRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.updateCartItemSuccess, (state, action) => {
      state.loading = false;
      state.cartItems = state.cartItems.map((item) =>
        item.cartItemId === action.payload.cartItemId ? action.payload : item
      );
    })
    .addCase(actions.updateCartItemFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Remove Cart Item
    .addCase(actions.removeCartItemSuccess, (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.cartItemId !== action.payload);
    })

    // Clear Cart
    .addCase(actions.clearCartSuccess, (state) => {
      state.cart = null;
      state.cartItems = [];
    })

    // Logout clear cart
    .addCase(logout, (state) => {
      state.cart = null;
      state.cartItems = [];
    });
});

export default cartReducer;