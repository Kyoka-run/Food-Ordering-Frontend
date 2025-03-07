import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategory } from '../../../redux/actions/restaurantActions';

const CategoryForm = ({ handleClose, category }) => {
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.restaurant.usersRestaurant?.restaurantId);
  const jwt = localStorage.getItem("jwt");
  const isEditMode = !!category;

  // Form state
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
  });

  // Initialize form data when in edit mode
  useEffect(() => {
    if (category) {
      setFormData({
        categoryId: category.categoryId || '',
        name: category.name || '',
      });
    }
  }, [category]);

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (isEditMode) {
      // Update existing category
      dispatch(updateCategory({ reqData: formData, jwt }));
    } else {
      // Create new category
      const data = {
        name: formData.name,
        restaurant: {
          restaurantId: restaurantId
        }
      };
      dispatch(createCategory({ reqData: data, jwt }));
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
    <div className="p-5" data-testid="category-form">
      <Typography 
        variant="h6" 
        className="text-center text-gray-600 mb-6"
        data-testid="form-title"
      >
        {isEditMode ? 'Update Category' : 'Create Category'}
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
          inputProps={{ "data-testid": "category-name-input" }}
        />
        
        <div className="flex justify-end space-x-2">
          <Button 
            onClick={handleClose}
            variant="outlined" 
            color="secondary"
            data-testid="cancel-button"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            data-testid="submit-button"
          >
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;