import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem, updateMenuItem } from '../../../redux/actions/menuActions';

// Dropdown menu props
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MenuItemForm = ({ handleClose, menuItem }) => {
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.restaurant.usersRestaurant?.restaurantId);
  const categories = useSelector((state) => state.restaurant.categories);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const jwt = localStorage.getItem("jwt");
  const isEditMode = !!menuItem;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    restaurantId: restaurantId || "",
    vegetarian: true,
    seasonal: false,
    ingredients: []
  });

  // Initialize form data when in edit mode or when restaurantId changes
  useEffect(() => {
    if (menuItem) {
      setFormData({
        foodId: menuItem.foodId,
        name: menuItem.name || "",
        description: menuItem.description || "",
        price: menuItem.price || "",
        category: menuItem.category || "",
        image: menuItem.image || "",
        restaurantId: restaurantId || "",
        vegetarian: menuItem.vegetarian ?? true,
        seasonal: menuItem.seasonal ?? false,
        ingredients: menuItem.ingredients || []
      });
    } else if (restaurantId) {
      setFormData(prev => ({
        ...prev,
        restaurantId
      }));
    }
  }, [menuItem, restaurantId]);

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (isEditMode) {
      // Update existing menu item
      dispatch(updateMenuItem({ 
        menuItem: formData, 
        foodId: menuItem.foodId, 
        jwt 
      }));
    } else {
      // Create new menu item
      dispatch(createMenuItem({ 
        menu: formData, 
        jwt 
      }));
    }
    
    handleClose();
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="p-5 max-h-[80vh] overflow-y-auto" data-testid="menu-item-form">
      <Typography 
        variant="h5" 
        className="text-center text-gray-600 mb-6"
        data-testid="form-title"
      >
        {isEditMode ? 'Update Menu Item' : 'Create Menu Item'}
      </Typography>
      
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          {/* Image URL */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="image"
              label="Image URL"
              value={formData.image}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "menu-item-image-input" }}
            />
          </Grid>

          {/* Name and description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "menu-item-name-input" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="description"
              label="Description"
              multiline
              rows={2}
              value={formData.description}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "menu-item-description-input" }}
            />
          </Grid>

          {/* Price and category */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "menu-item-price-input" }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel id="category-select-label">Food Category</InputLabel>
              <Select
                labelId="category-select-label"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Food Category"
                data-testid="menu-item-category-select"
              >
                {categories.map((item) => (
                  <MenuItem key={item.categoryId} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Ingredients multiselect */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="ingredients-select-label">Ingredients</InputLabel>
              <Select
                labelId="ingredients-select-label"
                multiple
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                input={<OutlinedInput label="Ingredients" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value.id || value.ingredientsItemId} label={value.name} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                data-testid="menu-item-ingredients-select"
              >
                {ingredients?.map((item) => (
                  <MenuItem
                    key={item.ingredientsItemId}
                    value={item}
                    data-testid={`ingredient-option-${item.ingredientsItemId}`}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Vegetarian and seasonal toggles */}
          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel id="vegetarian-select-label">Is Vegetarian</InputLabel>
              <Select
                labelId="vegetarian-select-label"
                name="vegetarian"
                value={formData.vegetarian}
                onChange={handleInputChange}
                label="Is Vegetarian"
                data-testid="menu-item-vegetarian-select"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel id="seasonal-select-label">Is Seasonal</InputLabel>
              <Select
                labelId="seasonal-select-label"
                name="seasonal"
                value={formData.seasonal}
                onChange={handleInputChange}
                label="Is Seasonal"
                data-testid="menu-item-seasonal-select"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        {/* Form actions */}
        <Box className="flex justify-end space-x-2 pt-4">
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
        </Box>
      </form>
    </div>
  );
};

export default MenuItemForm;