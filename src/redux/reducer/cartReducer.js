import { createReducer } from '@reduxjs/toolkit';
import {
  findCartRequest,
  findCartSuccess,
  findCartFailure,
  addItemRequest,
  addItemSuccess,
  addItemFailure,
  updateCartItemRequest,
  updateCartItemSuccess,
  updateCartItemFailure,
  clearCartSuccess
} from '../actions/cartActions';

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(findCartRequest, (state) => {
      state.loading = true;
    })
    .addCase(findCartSuccess, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.cartItems = action.payload.items;
    })
    .addCase(findCartFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(addItemSuccess, (state, action) => {
      state.loading = false;
      state.cartItems = [action.payload, ...state.cartItems];
    })
    .addCase(updateCartItemSuccess, (state, action) => {
      state.loading = false;
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    })
    .addCase(clearCartSuccess, (state) => {
      state.cart = null;
      state.cartItems = [];
    });
});

export default cartReducer;
