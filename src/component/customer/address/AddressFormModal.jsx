import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const addressValidationSchema = Yup.object({
  street: Yup.string()
    .required('Street address is required')
    .min(5, 'Please enter a valid street address'),
  city: Yup.string()
    .required('City is required'),
  postalCode: Yup.string()
    .required('Postal code is required')
    .matches(/^[0-9A-Z]{3,7}$/, 'Please enter a valid postal code'),
  country: Yup.string()
    .required('Country is required')
});

// Modal component for adding/editing addresses
const AddressFormModal = ({ 
  initialValues, 
  onClose, 
  onSubmit,
  isEditing = false
}) => {
  // Initialize formik
  const formik = useFormik({
    initialValues,
    validationSchema: addressValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Address' : 'Add New Address'}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Street Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street
            </label>
            <input
              type="text"
              name="street"
              className="w-full px-3 py-2 border rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street}
            />
            {formik.touched.street && formik.errors.street && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.street}
              </div>
            )}
          </div>

          {/* City Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              className="w-full px-3 py-2 border rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.city}
              </div>
            )}
          </div>

          {/* Country Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                className="w-full px-3 py-2 border rounded-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              />
              {formik.touched.country && formik.errors.country && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.country}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PostalCode
              </label>
              <input
                type="text"
                name="postalCode"
                className="w-full px-3 py-2 border rounded-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postalCode}
              />
              {formik.touched.postalCode && formik.errors.postalCode && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.postalCode}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormModal;