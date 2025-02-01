import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

export const getAllRestaurantsRequest = createAction('restaurant/getAllRequest');
export const getAllRestaurantsSuccess = createAction('restaurant/getAllSuccess');
export const getAllRestaurantsFailure = createAction('restaurant/getAllFailure');

export const createRestaurantRequest = createAction('restaurant/createRequest');
export const createRestaurantSuccess = createAction('restaurant/createSuccess');
export const createRestaurantFailure = createAction('restaurant/createFailure');

export const getAllRestaurants = (token) => async (dispatch) => {
  dispatch(getAllRestaurantsRequest());
  try {
    const { data } = await api.get("/api/restaurants", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(getAllRestaurantsSuccess(data));
  } catch (error) {
    dispatch(getAllRestaurantsFailure(error.message));
  }
};