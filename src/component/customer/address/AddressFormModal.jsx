import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createAddress, updateAddress } from '../../../redux/actions/addressActions';

const addressValidationSchema = Yup.object({
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  postalCode: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is required')
});

const AddressFormModal = ({ open, onClose, initialValues, isEditing }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      street: '',
      city: '',
      postalCode: '',
      country: 'Ireland'
    },
    validationSchema: addressValidationSchema,

    onSubmit: (values) => {
      if (isEditing) {
        dispatch(updateAddress({
          addressId: initialValues.addressId,
          addressData: values,
          jwt
        }));
      } else {
        dispatch(createAddress({ addressData: values, jwt }));
      }
      onClose();
    }
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Edit Address' : 'Add New Address'}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <div className="space-y-4">
            <TextField
              fullWidth
              name="street"
              label="Street"
              value={formik.values.street}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              fullWidth
              name="postalCode"
              label="Postal Code"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
              error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
              helperText={formik.touched.postalCode && formik.errors.postalCode}
            />
            <TextField
              fullWidth
              name="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {isEditing ? 'Update' : 'Add'} Address
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddressFormModal;