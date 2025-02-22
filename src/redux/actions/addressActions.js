import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Action Types
export const getUserAddressesRequest = createAction('address/getUserAddressesRequest');
export const getUserAddressesSuccess = createAction('address/getUserAddressesSuccess');
export const getUserAddressesFailure = createAction('address/getUserAddressesFailure');

export const createAddressRequest = createAction('address/createAddressRequest');
export const createAddressSuccess = createAction('address/createAddressSuccess');
export const createAddressFailure = createAction('address/createAddressFailure');

export const updateAddressRequest = createAction('address/updateAddressRequest');
export const updateAddressSuccess = createAction('address/updateAddressSuccess');
export const updateAddressFailure = createAction('address/updateAddressFailure');

export const deleteAddressRequest = createAction('address/deleteAddressRequest');
export const deleteAddressSuccess = createAction('address/deleteAddressSuccess');
export const deleteAddressFailure = createAction('address/deleteAddressFailure');

// Async Actions
export const getUserAddresses = (jwt) => async (dispatch) => {
  dispatch(getUserAddressesRequest());
  try {
    const response = await api.get('/address', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch(getUserAddressesSuccess(response.data));
  } catch (error) {
    dispatch(getUserAddressesFailure(error.message));
  }
};

export const createAddress = ({addressData, jwt}) => async (dispatch) => {
  dispatch(createAddressRequest());
  try {
    const response = await api.post('/address', addressData, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch(createAddressSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(createAddressFailure(error.message));
    throw error;
  }
};

export const updateAddress = ({addressId, addressData, jwt}) => async (dispatch) => {
  dispatch(updateAddressRequest());
  try {
    const response = await api.put(`/address/${addressId}`, addressData, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch(updateAddressSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(updateAddressFailure(error.message));
    throw error;
  }
};

export const deleteAddress = ({addressId, jwt}) => async (dispatch) => {
  dispatch(deleteAddressRequest());
  try {
    await api.delete(`/address/${addressId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch(deleteAddressSuccess(addressId));
  } catch (error) {
    dispatch(deleteAddressFailure(error.message));
    throw error;
  }
};