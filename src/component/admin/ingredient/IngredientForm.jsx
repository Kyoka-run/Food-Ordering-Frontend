import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient, updateIngredient } from '../../../redux/actions/ingredientActions';

const IngredientForm = ({ handleClose, ingredient }) => {
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.restaurant.usersRestaurant?.restaurantId);
  const categories = useSelector((state) => state.ingredients.category);
  const jwt = localStorage.getItem("jwt");
  const isEditMode = !!ingredient;

  // Form state
  const [formData, setFormData] = useState({
    ingredientsItemId: '',
    name: '',
    ingredientCategoryId: ''
  });

  // Initialize form data when in edit mode
  useEffect(() => {
    if (ingredient) {
      setFormData({
        ingredientsItemId: ingredient.ingredientsItemId || '',
        name: ingredient.name || '',
        ingredientCategoryId: ingredient.category?.ingredientCategoryId || ingredient.ingredientCategoryId || '',
      });
    }
  }, [ingredient]);

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (isEditMode) {
      // Update existing ingredient
      const data = {
        ...formData,
        restaurantId: restaurantId
      };
      dispatch(updateIngredient({ data, jwt }));
    } else {
      // Create new ingredient
      const data = {
        ...formData,
        restaurantId: restaurantId
      };
      dispatch(createIngredient({ data, jwt }));
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
    <div className="p-5" data-testid="ingredient-form">
      <Typography 
        variant="h6" 
        className="text-center text-gray-600 mb-6"
        data-testid="form-title"
      >
        {isEditMode ? 'Update Ingredient' : 'Create Ingredient'}
      </Typography>
      
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <TextField
          label="Ingredient Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
          variant="outlined"
          className="mb-4"
          inputProps={{ "data-testid": "ingredient-name-input" }}
        />
        
        <FormControl fullWidth className="mb-4">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={formData.ingredientCategoryId}
            label="Category"
            name="ingredientCategoryId"
            onChange={handleInputChange}
            required
            data-testid="ingredient-category-select"
          >
            {categories.map((item) => (
              <MenuItem 
                key={item.ingredientCategoryId} 
                value={item.ingredientCategoryId}
                data-testid={`category-option-${item.ingredientCategoryId}`}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
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

export default IngredientForm;