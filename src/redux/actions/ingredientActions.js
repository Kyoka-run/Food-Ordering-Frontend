import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';
import toast from 'react-hot-toast';

// Action Creators
export const getIngredientsRequest = createAction('ingredients/getRequest');
export const getIngredientsSuccess = createAction('ingredients/getSuccess');
export const getIngredientsFailure = createAction('ingredients/getFailure');

export const createIngredientRequest = createAction('ingredients/createRequest');
export const createIngredientSuccess = createAction('ingredients/createSuccess');
export const createIngredientFailure = createAction('ingredients/createFailure');

export const createCategoryRequest = createAction('ingredients/createCategoryRequest');
export const createCategorySuccess = createAction('ingredients/createCategorySuccess');
export const createCategoryFailure = createAction('ingredients/createCategoryFailure');

export const getCategoryRequest = createAction('ingredients/getCategoryRequest');
export const getCategorySuccess = createAction('ingredients/getCategorySuccess');
export const getCategoryFailure = createAction('ingredients/getCategoryFailure');

export const updateStockRequest = createAction('ingredients/updateStockRequest');
export const updateStockSuccess = createAction('ingredients/updateStockSuccess');
export const updateStockFailure = createAction('ingredients/updateStockFailure');

export const updateIngredientRequest = createAction('ingredients/updateRequest');
export const updateIngredientSuccess = createAction('ingredients/updateSuccess');
export const updateIngredientFailure = createAction('ingredients/updateFailure');

export const updateIngredientCategoryRequest = createAction('ingredients/updateCategoryRequest');
export const updateIngredientCategorySuccess = createAction('ingredients/updateCategorySuccess');
export const updateIngredientCategoryFailure = createAction('ingredients/updateCategoryFailure');

export const deleteIngredientRequest = createAction('ingredients/deleteRequest');
export const deleteIngredientSuccess = createAction('ingredients/deleteSuccess');
export const deleteIngredientFailure = createAction('ingredients/deleteFailure');

export const deleteIngredientCategoryRequest = createAction('ingredients/deleteCategoryRequest');
export const deleteIngredientCategorySuccess = createAction('ingredients/deleteCategorySuccess');
export const deleteIngredientCategoryFailure = createAction('ingredients/deleteCategoryFailure');

// Async Actions
export const getIngredientsOfRestaurant = ({id, jwt}) => async (dispatch) => {
  try {
    dispatch(getIngredientsRequest());
    const response = await api.get(`/admin/ingredients/restaurant/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getIngredientsSuccess(response.data));
  } catch (error) {
    dispatch(getIngredientsFailure(error.message));
    toast.error('Failed to load ingredients');
  }
};

export const createIngredient = ({data, jwt}) => async (dispatch) => {
  try {
    dispatch(createIngredientRequest());
    const response = await api.post(`/admin/ingredients`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(createIngredientSuccess(response.data));
    toast.success('Ingredient created successfully');
  } catch (error) {
    dispatch(createIngredientFailure(error.message));
    toast.error('Failed to create ingredient');
  }
};

export const createIngredientCategory = ({data, jwt}) => async (dispatch) => {
  try {
    dispatch(createCategoryRequest());
    const response = await api.post(`/admin/ingredients/category`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(createCategorySuccess(response.data));
    toast.success('Ingredient category created successfully');
  } catch (error) {
    dispatch(createCategoryFailure(error.message));
    toast.error('Failed to create ingredient category');
  }
};

export const getIngredientCategory = ({id, jwt}) => async (dispatch) => {
  try {
    dispatch(getCategoryRequest());
    const response = await api.get(`/admin/ingredients/restaurant/${id}/category`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getCategorySuccess(response.data));
  } catch (error) {
    dispatch(getCategoryFailure(error.message));
    toast.error('Failed to load ingredient categories');
  }
};

export const updateStockOfIngredient = ({ingredientsItemId, jwt}) => async (dispatch) => {
  try {
    dispatch(updateStockRequest());
    const { data } = await api.put(`/admin/ingredients/${ingredientsItemId}/stock`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateStockSuccess(data));
    toast.success('Ingredient stock updated');
  } catch (error) {
    dispatch(updateStockFailure(error.message));
    toast.error('Failed to update ingredient stock');
  }
};

export const updateIngredient = ({ data, jwt }) => async (dispatch) => {
  dispatch(updateIngredientRequest());
  try {
    const response = await api.put(`/admin/ingredients/${data.ingredientsItemId}`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateIngredientSuccess(response.data));
    toast.success('Ingredient updated successfully');
  } catch (error) {
    dispatch(updateIngredientFailure(error.message));
    toast.error('Failed to update ingredient');
  }
};

export const updateIngredientCategory = ({ data, jwt }) => async (dispatch) => {
  dispatch(updateIngredientCategoryRequest());
  try {
    const response = await api.put(`/admin/ingredients/category/${data.ingredientCategoryId}`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateIngredientCategorySuccess(response.data));
    toast.success('Ingredient category updated successfully');
  } catch (error) {
    dispatch(updateIngredientCategoryFailure(error.message));
    toast.error('Failed to update ingredient category');
  }
};

// Delete ingredient action
export const deleteIngredient = ({ ingredientsItemId, jwt }) => async (dispatch) => {
  dispatch(deleteIngredientRequest());
  try {
    await api.delete(`/admin/ingredients/${ingredientsItemId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(deleteIngredientSuccess(ingredientsItemId));
    toast.success('Ingredient deleted successfully');
  } catch (error) {
    dispatch(deleteIngredientFailure(error.message));
    toast.error('Failed to delete ingredient');
  }
};

// Delete ingredient category action
export const deleteIngredientCategory = ({ ingredientCategoryId, jwt }) => async (dispatch) => {
  dispatch(deleteIngredientCategoryRequest());
  try {
    await api.delete(`/admin/ingredients/category/${ingredientCategoryId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(deleteIngredientCategorySuccess(ingredientCategoryId));
    toast.success('Ingredient category deleted successfully');
  } catch (error) {
    dispatch(deleteIngredientCategoryFailure(error.message));
    toast.error('Failed to delete ingredient category');
  }
};