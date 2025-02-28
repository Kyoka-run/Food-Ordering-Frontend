import { createAction } from '@reduxjs/toolkit';
import { api } from '../../config/api';
import { getUser } from './authActions';
import toast from 'react-hot-toast';

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
    toast.error("Failed to load addresses");
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
    dispatch(getUser(jwt));
    toast.success("Address added successfully");
    return response.data;
  } catch (error) {
    dispatch(createAddressFailure(error.message));
    toast.error("Failed to add address");
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
    dispatch(getUser(jwt));
    toast.success("Address updated successfully");
    return response.data;
  } catch (error) {
    dispatch(updateAddressFailure(error.message));
    toast.error("Failed to update address");
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
    dispatch(getUser(jwt));
    toast.success("Address deleted successfully");
  } catch (error) {
    dispatch(deleteAddressFailure(error.message));
    toast.error("Failed to delete address, it may be used by an order");
    throw error;
  }
};