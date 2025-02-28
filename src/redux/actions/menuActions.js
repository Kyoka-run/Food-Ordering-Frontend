import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';
import toast from 'react-hot-toast';

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

export const updateMenuItemRequest = createAction('menu/updateRequest');
export const updateMenuItemSuccess = createAction('menu/updateSuccess');
export const updateMenuItemFailure = createAction('menu/updateFailure');

export const createMenuItem = ({menu, jwt}) => async (dispatch) => {
  dispatch(createMenuItemRequest());
  try {
    const { data } = await api.post("/admin/food", menu, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(createMenuItemSuccess(data));
    toast.success("Menu item created successfully");
  } catch (error) {
    dispatch(createMenuItemFailure(error.message));
    toast.error("Failed to create menu item");
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
    toast.error("Failed to load menu items");
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
    toast.error("Failed to search menu items");
  }
};

export const updateMenuItemsAvailability = ({foodId, jwt}) => async (dispatch) => {
  dispatch(updateMenuItemAvailabilityRequest());
  try {
    const { data } = await api.put(`/admin/food/${foodId}/availability`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateMenuItemAvailabilitySuccess(data));
    toast.success("Menu item availability updated");
  } catch (error) { 
    dispatch(updateMenuItemAvailabilityFailure(error.message));
    toast.error("Failed to update menu item availability");
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
    toast.success("Menu item deleted successfully");
  } catch (error) {
    dispatch(deleteMenuItemFailure(error.message));
    toast.error("Failed to delete menu item");
  }
};

export const updateMenuItem = ({ menuItem, foodId, jwt }) => async (dispatch) => {
  dispatch(updateMenuItemRequest());
  try {
    const { data } = await api.put(`/admin/food/${foodId}`, menuItem, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateMenuItemSuccess(data));
    toast.success("Menu item updated successfully");
  } catch (error) {
    dispatch(updateMenuItemFailure(error.message));
    toast.error("Failed to update menu item");
  }
};