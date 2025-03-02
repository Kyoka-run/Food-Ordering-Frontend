import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../../../redux/actions/restaurantActions';

const EventForm = ({ handleClose, event }) => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");
  const isEditMode = !!event;

  // Form state
  const [formData, setFormData] = useState({
    image: "",
    location: "",
    name: "",
    description: "",
    startTime: null,
    endTime: null
  });

  // Initialize form data when in edit mode
  useEffect(() => {
    if (event) {
      setFormData({
        eventId: event.eventId,
        image: event.image || "",
        location: event.location || "",
        name: event.name || "",
        description: event.description || "",
        startTime: event.startTime ? dayjs(event.startTime) : null,
        endTime: event.endTime ? dayjs(event.endTime) : null
      });
    }
  }, [event]);

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle date picker changes
  const handleDateChange = (date, dateType) => {
    setFormData({ ...formData, [dateType]: date });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format dates for API
    const formattedData = {
      ...formData,
      startTime: formData.startTime ? formData.startTime.format('YYYY-MM-DDTHH:mm:ss') : null,
      endTime: formData.endTime ? formData.endTime.format('YYYY-MM-DDTHH:mm:ss') : null,
      restaurantId: restaurant.usersRestaurant?.restaurantId
    };
    
    if (isEditMode) {
      // Update existing event
      dispatch(updateEvent({
        id: event.eventId,
        eventDTO: formattedData,
        jwt
      }));
    } else {
      // Create new event
      dispatch(createEvent({
        data: formattedData,
        jwt
      }));
    }
    
    handleClose();
  };

  return (
    <Box className="p-5 max-h-[80vh] overflow-y-auto">
      <Typography 
        variant="h5" 
        className="text-center text-gray-600 mb-6"
      >
        {isEditMode ? 'Update Event' : 'Create New Event'}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="image"
              label="Image URL"
              variant="outlined"
              fullWidth
              required
              value={formData.image}
              onChange={handleInputChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Event Name"
              variant="outlined"
              fullWidth
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="location"
              label="Location"
              variant="outlined"
              fullWidth
              required
              value={formData.location}
              onChange={handleInputChange}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date and Time"
                value={formData.startTime}
                onChange={(newValue) => handleDateChange(newValue, "startTime")}
                sx={{ width: "100%" }}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date and Time"
                value={formData.endTime}
                onChange={(newValue) => handleDateChange(newValue, "endTime")}
                sx={{ width: "100%" }}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        
        <Box className="flex justify-end space-x-2 mt-6">
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
            {isEditMode ? 'Update Event' : 'Create Event'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EventForm;