import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

export const createMenuItemRequest = createAction('menu/createRequest');
export const createMenuItemSuccess = createAction('menu/createSuccess');
export const createMenuItemFailure = createAction('menu/createFailure');

export const getMenuItemsRequest = createAction('menu/getItemsRequest');
export const getMenuItemsSuccess = createAction('menu/getItemsSuccess');
export const getMenuItemsFailure = createAction('menu/getItemsFailure');

export const updateMenuItemAvailabilityRequest = createAction('menu/updateAvailabilityRequest');
export const updateMenuItemAvailabilitySuccess = createAction('menu/updateAvailabilitySuccess');
export const updateMenuItemAvailabilityFailure = createAction('menu/updateAvailabilityFailure');

export const createMenuItem = ({menu, jwt}) => async (dispatch) => {
  dispatch(createMenuItemRequest());
  try {
    const { data } = await api.post("api/admin/food", menu, {
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
      `/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}
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