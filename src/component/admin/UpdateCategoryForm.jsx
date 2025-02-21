import React from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../redux/actions/restaurantActions';

const UpdateCategoryForm = ({ handleClose, selectedCategory }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = React.useState({
    categoryId: selectedCategory?.categoryId || '',
    name: selectedCategory?.name || '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(updateCategory({ reqData: formData, jwt }));
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
      <h1 className="text-gray-400 text-center text-xl pb-10">Update Category</h1>
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

export default UpdateCategoryForm;