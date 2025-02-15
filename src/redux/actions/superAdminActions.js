import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Creators
export const getCustomersRequest = createAction('superAdmin/getCustomersRequest');
export const getCustomersSuccess = createAction('superAdmin/getCustomersSuccess');
export const getCustomersFailure = createAction('superAdmin/getCustomersFailure');

// Async Actions
export const getCustomers = (jwt) => async (dispatch) => {
  dispatch(getCustomersRequest());
  try {
    const { data } = await api.get("/customers",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(getCustomersSuccess(data));
  } catch (error) {
    dispatch(getCustomersFailure(error.message));
  }
};
