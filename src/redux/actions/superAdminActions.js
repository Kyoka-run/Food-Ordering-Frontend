import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

export const getCustomersRequest = createAction('superAdmin/getCustomersRequest');
export const getCustomersSuccess = createAction('superAdmin/getCustomersSuccess');
export const getCustomersFailure = createAction('superAdmin/getCustomersFailure');

export const getPendingCustomersRequest = createAction('superAdmin/getPendingCustomersRequest');
export const getPendingCustomersSuccess = createAction('superAdmin/getPendingCustomersSuccess');
export const getPendingCustomersFailure = createAction('superAdmin/getPendingCustomersFailure');

export const getCustomers = () => async (dispatch) => {
  dispatch(getCustomersRequest());
  try {
    const { data } = await api.get("api/customers");
    dispatch(getCustomersSuccess(data));
  } catch (error) {
    dispatch(getCustomersFailure(error.message));
  }
};

export const getPendingCustomers = () => async (dispatch) => {
  dispatch(getPendingCustomersRequest());
  try {
    const { data } = await api.get("api/customers");
    dispatch(getPendingCustomersSuccess(data));
  } catch (error) {
    dispatch(getPendingCustomersFailure(error.message));
  }
};