import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory, updateIngredientCategory } from '../../../redux/actions/ingredientActions';

/**
 * Shared form component for creating and updating ingredient categories
 * @param {function} handleClose - Function to close the modal
 * @param {object} category - Ingredient category object for edit mode (null for create mode)
 */
const IngredientCategoryForm = ({ handleClose, category }) => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");
  const isEditMode = !!category;

  // Form state
  const [formData, setFormData] = useState({
    ingredientCategoryId: '',
    name: '',
  });

  // Initialize form data when in edit mode
  useEffect(() => {
    if (category) {
      setFormData({
        ingredientCategoryId: category.ingredientCategoryId || '',
        name: category.name || '',
      });
    }
  }, [category]);

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (isEditMode) {
      // Update existing category
      const data = {
        ...formData,
        restaurantId: restaurant.usersRestaurant?.restaurantId
      };
      dispatch(updateIngredientCategory({ data, jwt }));
    } else {
      // Create new category
      const data = {
        name: formData.name,
        restaurantId: restaurant.usersRestaurant?.restaurantId,
      };
      dispatch(createIngredientCategory({ data, jwt }));
    }
    
    handleClose();
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-5">
      <Typography 
        variant="h6" 
        className="text-center text-gray-600 mb-6"
      >
        {isEditMode ? 'Update Ingredient Category' : 'Create Ingredient Category'}
      </Typography>
      
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <TextField
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
          variant="outlined"
          className="mb-4"
        />
        
        <div className="flex justify-end space-x-2">
          <Button 
            onClick={handleClose}
            variant="outlined" 
            color="secondary"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IngredientCategoryForm;