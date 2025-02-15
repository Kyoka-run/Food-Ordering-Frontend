import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Creators
// Restaurant Basic Operations
export const getAllRestaurantsRequest = createAction('restaurant/getAllRequest');
export const getAllRestaurantsSuccess = createAction('restaurant/getAllSuccess');
export const getAllRestaurantsFailure = createAction('restaurant/getAllFailure');

export const getRestaurantByIdRequest = createAction('restaurant/getByIdRequest');
export const getRestaurantByIdSuccess = createAction('restaurant/getByIdSuccess');
export const getRestaurantByIdFailure = createAction('restaurant/getByIdFailure');

export const getRestaurantByUserIdRequest = createAction('restaurant/getByUserIdRequest');
export const getRestaurantByUserIdSuccess = createAction('restaurant/getByUserIdSuccess');
export const getRestaurantByUserIdFailure = createAction('restaurant/getByUserIdFailure');

export const createRestaurantRequest = createAction('restaurant/createRequest');
export const createRestaurantSuccess = createAction('restaurant/createSuccess');
export const createRestaurantFailure = createAction('restaurant/createFailure');

export const updateRestaurantRequest = createAction('restaurant/updateRequest');
export const updateRestaurantSuccess = createAction('restaurant/updateSuccess');
export const updateRestaurantFailure = createAction('restaurant/updateFailure');

export const deleteRestaurantRequest = createAction('restaurant/deleteRequest');
export const deleteRestaurantSuccess = createAction('restaurant/deleteSuccess');
export const deleteRestaurantFailure = createAction('restaurant/deleteFailure');

export const updateRestaurantStatusRequest = createAction('restaurant/updateStatusRequest');
export const updateRestaurantStatusSuccess = createAction('restaurant/updateStatusSuccess');
export const updateRestaurantStatusFailure = createAction('restaurant/updateStatusFailure');

// Events
export const createEventRequest = createAction('restaurant/createEventRequest');
export const createEventSuccess = createAction('restaurant/createEventSuccess');
export const createEventFailure = createAction('restaurant/createEventFailure');

export const getAllEventsRequest = createAction('restaurant/getAllEventsRequest');
export const getAllEventsSuccess = createAction('restaurant/getAllEventsSuccess');
export const getAllEventsFailure = createAction('restaurant/getAllEventsFailure');

export const deleteEventRequest = createAction('restaurant/deleteEventRequest');
export const deleteEventSuccess = createAction('restaurant/deleteEventSuccess');
export const deleteEventFailure = createAction('restaurant/deleteEventFailure');

export const getRestaurantEventsRequest = createAction('restaurant/getEventsRequest');
export const getRestaurantEventsSuccess = createAction('restaurant/getEventsSuccess');
export const getRestaurantEventsFailure = createAction('restaurant/getEventsFailure');

// Categories
export const createCategoryRequest = createAction('restaurant/createCategoryRequest');
export const createCategorySuccess = createAction('restaurant/createCategorySuccess');
export const createCategoryFailure = createAction('restaurant/createCategoryFailure');

export const getRestaurantsCategoryRequest = createAction('restaurant/getCategoryRequest');
export const getRestaurantsCategorySuccess = createAction('restaurant/getCategorySuccess');
export const getRestaurantsCategoryFailure = createAction('restaurant/getCategoryFailure');

export const updateCategoryRequest = createAction('restaurant/updateCategoryRequest');
export const updateCategorySuccess = createAction('restaurant/updateCategorySuccess');
export const updateCategoryFailure = createAction('restaurant/updateCategoryFailure');

// Async Actions
export const getAllRestaurants = (jwt) => async (dispatch) => {
  dispatch(getAllRestaurantsRequest());
  try {
    const { data } = await api.get("/restaurants", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getAllRestaurantsSuccess(data));
  } catch (error) {
    dispatch(getAllRestaurantsFailure(error.message));
  }
};

export const getRestaurantById = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch(getRestaurantByIdRequest());
  try {
    const response = await api.get(`/restaurants/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getRestaurantByIdSuccess(response.data));
  } catch (error) {
    dispatch(getRestaurantByIdFailure(error.message));
  }
};

export const getRestaurantByUserId = (jwt) => async (dispatch) => {
  dispatch(getRestaurantByUserIdRequest());
  try {
    const { data } = await api.get(`/admin/restaurants/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getRestaurantByUserIdSuccess(data));
  } catch (error) {
    dispatch(getRestaurantByUserIdFailure(error.message));
  }
};

export const createRestaurant = ({ data, token }) => async (dispatch) => {
  dispatch(createRestaurantRequest());
  try {
    const { data: responseData } = await api.post(`/admin/restaurants`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(createRestaurantSuccess(responseData));
  } catch (error) {
    dispatch(createRestaurantFailure(error.message));
  }
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => async (dispatch) => {
  dispatch(updateRestaurantRequest());
  try {
    const response = await api.put(
      `/admin/restaurants/${restaurantId}`,
      restaurantData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(updateRestaurantSuccess(response.data));
  } catch (error) {
    dispatch(updateRestaurantFailure(error.message));
  }
};

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
  dispatch(deleteRestaurantRequest());
  try {
    await api.delete(`/admin/restaurants/${restaurantId}`);
    dispatch(deleteRestaurantSuccess(restaurantId));
  } catch (error) {
    dispatch(deleteRestaurantFailure(error.message));
  }
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch(updateRestaurantStatusRequest());
  try {
    const response = await api.put(
      `/admin/restaurants/${restaurantId}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(updateRestaurantStatusSuccess(response.data));
  } catch (error) {
    dispatch(updateRestaurantStatusFailure(error.message));
  }
};

export const createEvent = ({ data, jwt, restaurantId }) => async (dispatch) => {
  dispatch(createEventRequest());
  try {
    const response = await api.post(
      `/admin/events/restaurant/${restaurantId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(createEventSuccess(response.data));
  } catch (error) {
    dispatch(createEventFailure(error.message));
  }
};

export const getAllEvents = ({ jwt }) => async (dispatch) => {
  dispatch(getAllEventsRequest());
  try {
    const response = await api.get(`/events`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getAllEventsSuccess(response.data));
  } catch (error) {
    dispatch(getAllEventsFailure(error.message));
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch(deleteEventRequest());
  try {
    await api.delete(`/admin/events/${eventId}`);
    dispatch(deleteEventSuccess(eventId));
  } catch (error) {
    dispatch(deleteEventFailure(error.message));
  }
};

export const getRestaurantEvents = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch(getRestaurantEventsRequest());
  try {
    const response = await api.get(
      `/events/restaurant/${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(getRestaurantEventsSuccess(response.data));
  } catch (error) {
    dispatch(getRestaurantEventsFailure(error.message));
  }
};

export const createCategory = ({ reqData, jwt }) => async (dispatch) => {
  dispatch(createCategoryRequest());
  try {
    const response = await api.post(`/admin/category`, reqData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(createCategorySuccess(response.data));
  } catch (error) {
    dispatch(createCategoryFailure(error.message));
  }
};

export const getRestaurantsCategory = ({ jwt, restaurantId }) => async (dispatch) => {
  dispatch(getRestaurantsCategoryRequest());
  try {
    const response = await api.get(`/category/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(getRestaurantsCategorySuccess(response.data));
  } catch (error) {
    dispatch(getRestaurantsCategoryFailure(error.message));
  }
};

export const updateCategory = ({ reqData, jwt }) => async (dispatch) => {
  dispatch(updateCategoryRequest());
  try {
    const { data } = await api.put(`/admin/category/${reqData.categoryId}`, reqData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(updateCategorySuccess(data));
  } catch (error) {
    dispatch(updateCategoryFailure(error.message));
  }
};