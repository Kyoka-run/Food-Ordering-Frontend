import { createReducer } from '@reduxjs/toolkit';
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailure,
  createIngredientRequest,
  createIngredientSuccess,
  createIngredientFailure,
  updateIngredientStockSuccess
} from '../actions/ingredientActions';

const initialState = {
  ingredients: [],
  update: null,
  category: [],
  loading: false,
  error: null
};

const ingredientReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getIngredientsRequest, (state) => {
      state.loading = true;
    })
    .addCase(getIngredientsSuccess, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    })
    .addCase(getIngredientsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createIngredientSuccess, (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
    })
    .addCase(updateIngredientStockSuccess, (state, action) => {
      state.update = action.payload;
      state.ingredients = state.ingredients.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    });
});

export default ingredientReducer;