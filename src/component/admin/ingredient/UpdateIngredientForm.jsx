import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateIngredient } from '../../../redux/actions/ingredientActions';

const UpdateIngredientForm = ({ handleClose, selectedIngredient }) => {
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = React.useState({
    ingredientsItemId: selectedIngredient?.ingredientsItemId || '',
    name: selectedIngredient?.name || '',
    ingredientCategoryId: selectedIngredient?.category?.ingredientCategoryId || ''
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...formData,
      restaurantId: restaurant.usersRestaurant.restaurantId
    };
    dispatch(updateIngredient({ data, jwt }));
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-gray-400 text-center text-xl pb-10">Update Ingredient</h1>
      <form className="space-y-5" onSubmit={handleFormSubmit}>
        <TextField
          label="Ingredient Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.ingredientCategoryId}
            label="Category"
            name="ingredientCategoryId"
            onChange={handleInputChange}
          >
            {ingredients.category.map((item) => (
              <MenuItem key={item.ingredientCategoryId} value={item.ingredientCategoryId}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateIngredientForm;