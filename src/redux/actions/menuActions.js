import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Creators
export const createMenuItemRequest = createAction('menu/createRequest');
export const createMenuItemSuccess = createAction('menu/createSuccess');
export const createMenuItemFailure = createAction('menu/createFailure');

export const getMenuItemsRequest = createAction('menu/getItemsRequest');
export const getMenuItemsSuccess = createAction('menu/getItemsSuccess');
export const getMenuItemsFailure = createAction('menu/getItemsFailure');

export const searchMenuItemRequest = createAction('menu/searchRequest');
export const searchMenuItemSuccess = createAction('menu/searchSuccess');
export const searchMenuItemFailure = createAction('menu/searchFailure');

export const updateMenuItemAvailabilityRequest = createAction('menu/updateAvailabilityRequest');
export const updateMenuItemAvailabilitySuccess = createAction('menu/updateAvailabilitySuccess');
export const updateMenuItemAvailabilityFailure = createAction('menu/updateAvailabilityFailure');

export const deleteMenuItemRequest = createAction('menu/deleteRequest');
export const deleteMenuItemSuccess = createAction('menu/deleteSuccess');
export const deleteMenuItemFailure = createAction('menu/deleteFailure');

// Async Actions
export const createMenuItem = ({menu, jwt}) => async (dispatch) => {
  dispatch(createMenuItemRequest());
  try {
    const { data } = await api.post("/admin/food", menu, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(createMenuItemSuccess(data));
  } catch (error) {
    dispatch(createMenuItemFailure(error.message));
  }
};

export const getMenuItemsByRestaurantId = (reqData) => async (dispatch) => {
  dispatch(getMenuItemsRequest());
  try {
    const { data } = await api.get(
      `/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}
      &seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      }
    );
    dispatch(getMenuItemsSuccess(data));
  } catch (error) {
    dispatch(getMenuItemsFailure(error.message));
  }
};

export const searchMenuItem = ({keyword, jwt}) => async (dispatch) => {
  dispatch(searchMenuItemRequest());
  try {
    const { data } = await api.get(`/food/search?name=${keyword}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(searchMenuItemSuccess(data));
  } catch (error) {
    dispatch(searchMenuItemFailure(error.message));
  }
};

export const updateMenuItemsAvailability = ({foodId, jwt}) => async (dispatch) => {
  dispatch(updateMenuItemAvailabilityRequest());
  try {
    const { data } = await api.put(`/admin/food/${foodId}`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateMenuItemAvailabilitySuccess(data));
  } catch (error) {
    dispatch(updateMenuItemAvailabilityFailure(error.message));
  }
};

export const deleteFoodAction = ({foodId, jwt}) => async (dispatch) => {
  dispatch(deleteMenuItemRequest());
  try {
    await api.delete(`/admin/food/${foodId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(deleteMenuItemSuccess(foodId));
  } catch (error) {
    dispatch(deleteMenuItemFailure(error.message));
  }
};