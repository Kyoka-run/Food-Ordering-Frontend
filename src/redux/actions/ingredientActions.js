import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

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

// Async Actions
export const getIngredientsOfRestaurant = ({id, jwt}) => async (dispatch) => {
  try {
    dispatch(getIngredientsRequest());
    const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getIngredientsSuccess(response.data));
  } catch (error) {
    dispatch(getIngredientsFailure(error.message));
  }
};

export const createIngredient = ({data, jwt}) => async (dispatch) => {
  try {
    dispatch(createIngredientRequest());
    const response = await api.post(`/api/admin/ingredients`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(createIngredientSuccess(response.data));
  } catch (error) {
    dispatch(createIngredientFailure(error.message));
  }
};

export const createIngredientCategory = ({data, jwt}) => async (dispatch) => {
  try {
    dispatch(createCategoryRequest());
    const response = await api.post(`/api/admin/ingredients/category`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(createCategorySuccess(response.data));
  } catch (error) {
    dispatch(createCategoryFailure(error.message));
  }
};

export const getIngredientCategory = ({id, jwt}) => async (dispatch) => {
  try {
    dispatch(getCategoryRequest());
    const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getCategorySuccess(response.data));
  } catch (error) {
    dispatch(getCategoryFailure(error.message));
  }
};

export const updateStockOfIngredient = ({id, jwt}) => async (dispatch) => {
  try {
    dispatch(updateStockRequest());
    const { data } = await api.put(`/api/admin/ingredients/${id}/stoke`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateStockSuccess(data));
  } catch (error) {
    dispatch(updateStockFailure(error.message));
  }
};