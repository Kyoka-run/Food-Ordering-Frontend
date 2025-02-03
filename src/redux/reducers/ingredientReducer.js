import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/ingredientActions';

const initialState = {
  ingredients: [],
  update: null,
  category: [],
  loading: false,
  error: null
};

const ingredientReducer = createReducer(initialState, (builder) => {
  builder
    // Get Ingredients
    .addCase(actions.getIngredientsRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.getIngredientsSuccess, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    })
    .addCase(actions.getIngredientsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Create Ingredient
    .addCase(actions.createIngredientRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.createIngredientSuccess, (state, action) => {
      state.loading = false;
      state.ingredients = [...state.ingredients, action.payload];
    })
    .addCase(actions.createIngredientFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Create Category
    .addCase(actions.createCategoryRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.createCategorySuccess, (state, action) => {
      state.loading = false;
      state.category = [...state.category, action.payload];
    })
    .addCase(actions.createCategoryFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get Category
    .addCase(actions.getCategoryRequest, (state) => {
      state.loading = true;
    })
    .addCase(actions.getCategorySuccess, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    })
    .addCase(actions.getCategoryFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Stock
    .addCase(actions.updateStockSuccess, (state, action) => {
      state.update = action.payload;
      state.ingredients = state.ingredients.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    });
});

export default ingredientReducer;