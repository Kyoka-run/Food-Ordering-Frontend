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
        item.ingredientsItemId === action.payload.ingredientsItemId ? action.payload : item
      );
    })
    
    // Update Ingredient
    .addCase(actions.updateIngredientRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.updateIngredientSuccess, (state, action) => {
      state.loading = false;
      state.ingredients = state.ingredients.map(ingredient => 
        ingredient.ingredientsItemId === action.payload.ingredientsItemId 
          ? action.payload 
          : ingredient
      );
    })
    .addCase(actions.updateIngredientFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Ingredient Category
    .addCase(actions.updateIngredientCategoryRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.updateIngredientCategorySuccess, (state, action) => {
      state.loading = false;
      state.category = state.category.map(category =>   
        category.ingredientCategoryId === action.payload.ingredientCategoryId 
          ? action.payload 
          : category
      );
    })
    .addCase(actions.updateIngredientCategoryFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete Ingredient
    .addCase(actions.deleteIngredientRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.deleteIngredientSuccess, (state, action) => {
      state.loading = false;
      state.ingredients = state.ingredients.filter(
        ingredient => ingredient.ingredientsItemId !== action.payload
      );
    })
    .addCase(actions.deleteIngredientFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete Ingredient Category
    .addCase(actions.deleteIngredientCategoryRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actions.deleteIngredientCategorySuccess, (state, action) => {
      state.loading = false;
      state.category = state.category.filter(
        category => category.ingredientCategoryId !== action.payload
      );
    })
    .addCase(actions.deleteIngredientCategoryFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default ingredientReducer;