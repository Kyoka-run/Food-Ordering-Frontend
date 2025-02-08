import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Creators
export const getCustomersRequest = createAction('superAdmin/getCustomersRequest');
export const getCustomersSuccess = createAction('superAdmin/getCustomersSuccess');
export const getCustomersFailure = createAction('superAdmin/getCustomersFailure');

export const getPendingCustomersRequest = createAction('superAdmin/getPendingCustomersRequest');
export const getPendingCustomersSuccess = createAction('superAdmin/getPendingCustomersSuccess');
export const getPendingCustomersFailure = createAction('superAdmin/getPendingCustomersFailure');

export const approveCustomerRequest = createAction('superAdmin/approveCustomerRequest');
export const approveCustomerSuccess = createAction('superAdmin/approveCustomerSuccess');
export const approveCustomerFailure = createAction('superAdmin/approveCustomerFailure');

export const rejectCustomerRequest = createAction('superAdmin/rejectCustomerRequest');
export const rejectCustomerSuccess = createAction('superAdmin/rejectCustomerSuccess');
export const rejectCustomerFailure = createAction('superAdmin/rejectCustomerFailure');

// Async Actions
export const getCustomers = () => async (dispatch) => {
  dispatch(getCustomersRequest());
  try {
    const { data } = await api.get("/customers");
    dispatch(getCustomersSuccess(data));
  } catch (error) {
    dispatch(getCustomersFailure(error.message));
  }
};

export const getPendingCustomers = () => async (dispatch) => {
  dispatch(getPendingCustomersRequest());
  try {
    const { data } = await api.get("/customers/pending");
    dispatch(getPendingCustomersSuccess(data));
  } catch (error) {
    dispatch(getPendingCustomersFailure(error.message));
  }
};

export const approveCustomer = (customerId) => async (dispatch) => {
  dispatch(approveCustomerRequest());
  try {
    const { data } = await api.put(`/customers/${customerId}/approve`);
    dispatch(approveCustomerSuccess(data));
  } catch (error) {
    dispatch(approveCustomerFailure(error.message));
  }
};

export const rejectCustomer = (customerId) => async (dispatch) => {
  dispatch(rejectCustomerRequest());
  try {
    const { data } = await api.put(`/customers/${customerId}/reject`);
    dispatch(rejectCustomerSuccess(data));
  } catch (error) {
    dispatch(rejectCustomerFailure(error.message));
  }
};
