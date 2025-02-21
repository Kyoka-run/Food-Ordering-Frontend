import React from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateIngredientCategory } from '../../redux/actions/ingredientActions';

const UpdateIngredientCategoryForm = ({ handleClose, selectedIngredientCategory }) => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = React.useState({
    ingredientCategoryId: selectedIngredientCategory?.ingredientCategoryId || '',
    name: selectedIngredientCategory?.name || '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...formData,
      restaurantId: restaurant.usersRestaurant.restaurantId
    };
    dispatch(updateIngredientCategory({ data, jwt }));
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
      <h1 className="text-gray-400 text-center text-xl pb-10">
        Update Ingredient Category
      </h1>
      <form className="space-y-5" onSubmit={handleFormSubmit}>
        <TextField
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateIngredientCategoryForm;