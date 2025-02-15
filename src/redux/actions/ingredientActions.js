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

export const updateIngredientRequest = createAction('ingredients/updateRequest');
export const updateIngredientSuccess = createAction('ingredients/updateSuccess');
export const updateIngredientFailure = createAction('ingredients/updateFailure');

export const updateIngredientCategoryRequest = createAction('ingredients/updateCategoryRequest');
export const updateIngredientCategorySuccess = createAction('ingredients/updateCategorySuccess');
export const updateIngredientCategoryFailure = createAction('ingredients/updateCategoryFailure');

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
  } catch (error) {
    dispatch(createIngredientFailure(error.message));
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
  } catch (error) {
    dispatch(createCategoryFailure(error.message));
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
  } catch (error) {
    dispatch(updateStockFailure(error.message));
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
  } catch (error) {
    dispatch(updateIngredientFailure(error.message));
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
  } catch (error) {
    dispatch(updateIngredientCategoryFailure(error.message));
  }
};