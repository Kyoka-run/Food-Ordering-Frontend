import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

export const getIngredientsRequest = createAction('ingredients/getRequest');
export const getIngredientsSuccess = createAction('ingredients/getSuccess');
export const getIngredientsFailure = createAction('ingredients/getFailure');

export const createIngredientRequest = createAction('ingredients/createRequest');
export const createIngredientSuccess = createAction('ingredients/createSuccess');
export const createIngredientFailure = createAction('ingredients/createFailure');

export const updateIngredientStockRequest = createAction('ingredients/updateStockRequest');
export const updateIngredientStockSuccess = createAction('ingredients/updateStockSuccess');
export const updateIngredientStockFailure = createAction('ingredients/updateStockFailure');

export const getIngredientsOfRestaurant = ({id, jwt}) => async (dispatch) => {
  dispatch(getIngredientsRequest());
  try {
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
  dispatch(createIngredientRequest());
  try {
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