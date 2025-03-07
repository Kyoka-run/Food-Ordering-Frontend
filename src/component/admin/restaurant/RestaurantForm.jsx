import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  Chip,
  Box
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createRestaurant, updateRestaurant } from '../../../redux/actions/restaurantActions';

const RestaurantForm = ({ handleClose, restaurant }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const isEditMode = !!restaurant;

  // Image URL input state
  const [imageUrl, setImageUrl] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisineType: "",
    address: "",
    contactInformation: {
      email: "",
      mobile: "",
      twitter: "",
      instagram: ""
    },
    openingHours: "Mon-Sun: 9:00 AM - 9:00 PM",
    images: []
  });

  // Initialize form data when in edit mode
  useEffect(() => {
    if (restaurant) {
      setFormData({
        restaurantId: restaurant.restaurantId || '',
        name: restaurant.name || '',
        description: restaurant.description || '',
        cuisineType: restaurant.cuisineType || '',
        address: restaurant.address || '',
        contactInformation: {
          email: restaurant.contactInformation?.email || '',
          mobile: restaurant.contactInformation?.mobile || '',
          twitter: restaurant.contactInformation?.twitter || '',
          instagram: restaurant.contactInformation?.instagram || ''
        },
        openingHours: restaurant.openingHours || 'Mon-Sun: 9:00 AM - 9:00 PM',
        images: restaurant.images || []
      });
    }
  }, [restaurant]);

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (isEditMode) {
      // Update existing restaurant
      dispatch(updateRestaurant({ 
        restaurantId: restaurant.restaurantId, 
        restaurantData: formData, 
        jwt 
      }));
    } else {
      // Create new restaurant
      dispatch(createRestaurant({ 
        data: formData, 
        token: jwt 
      }));
    }
    
    handleClose();
  };

  // Handle text input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    // Handle nested contactInformation fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle adding image URL to images array
  const handleAddImage = () => {
    if (imageUrl && imageUrl.trim() !== "") {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl.trim()]
      });
      setImageUrl("");
    }
  };

  // Handle removing image from images array
  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  return (
    <div className="p-5 max-h-[80vh] overflow-y-auto" data-testid="restaurant-form">
      <Typography 
        variant="h5" 
        className="text-center text-gray-600 mb-6"
        data-testid="form-title"
      >
        {isEditMode ? 'Update Restaurant' : 'Create Restaurant'}
      </Typography>
      
      <form className="space-y-4" onSubmit={handleFormSubmit} data-testid="restaurant-form-element">
        <Grid container spacing={2}>
          {/* Image URL input and add button */}
          <Grid item xs={12}>
            <Box className="flex space-x-2">
              <TextField
                fullWidth
                label="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                inputProps={{ "data-testid": "image-url-input" }}
              />
              <Button 
                variant="outlined" 
                onClick={handleAddImage}
                sx={{ whiteSpace: 'nowrap' }}
                data-testid="add-image-button"
              >
                Add Image
              </Button>
            </Box>
          </Grid>

          {/* Images chips */}
          <Grid item xs={12}>
            <Box className="flex flex-wrap gap-2" data-testid="image-chips-container">
              {formData.images.map((url, index) => (
                <Chip
                  key={index}
                  label={url}
                  onDelete={() => handleRemoveImage(index)}
                  data-testid={`image-chip-${index}`}
                />
              ))}
            </Box>
          </Grid>

          {/* Restaurant name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="name"
              label="Restaurant Name"
              value={formData.name}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "restaurant-name-input" }}
            />
          </Grid>

          {/* Restaurant description */}
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
              inputProps={{ "data-testid": "restaurant-description-input" }}
            />
          </Grid>

          {/* Cuisine type and opening hours */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="cuisineType"
              label="Cuisine Type"
              value={formData.cuisineType}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "restaurant-cuisine-input" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="openingHours"
              label="Opening Hours"
              value={formData.openingHours}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "restaurant-hours-input" }}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "restaurant-address-input" }}
            />
          </Grid>

          {/* Contact information */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="contactInformation.email"
              label="Email"
              type="email"
              value={formData.contactInformation.email}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "restaurant-email-input" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="contactInformation.mobile"
              label="Mobile"
              value={formData.contactInformation.mobile}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "restaurant-mobile-input" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="contactInformation.twitter"
              label="Twitter"
              value={formData.contactInformation.twitter}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "restaurant-twitter-input" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="contactInformation.instagram"
              label="Instagram"
              value={formData.contactInformation.instagram}
              onChange={handleInputChange}
              inputProps={{ "data-testid": "restaurant-instagram-input" }}
            />
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

export default RestaurantForm;