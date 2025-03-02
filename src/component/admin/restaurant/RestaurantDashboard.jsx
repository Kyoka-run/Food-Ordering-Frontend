import React, { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  Typography, 
  Modal,
  Grid,
  IconButton,
  Tooltip
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useDispatch, useSelector } from "react-redux";
import { 
  deleteRestaurant, 
  getRestaurantByUserId, 
  updateRestaurantStatus 
} from "../../../redux/actions/restaurantActions";
import RestaurantForm from "./RestaurantForm";

const RestaurantDashboard = () => {
  const dispatch = useDispatch();
  const usersRestaurant = useSelector(state => state.restaurant.usersRestaurant);
  const jwt = localStorage.getItem("jwt");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Fetch restaurant data on component mount
  useEffect(() => {
    dispatch(getRestaurantByUserId(jwt));
  }, [dispatch, jwt]);

  // Modal handlers
  const handleOpenModal = (restaurant = null) => {
    setSelectedRestaurant(restaurant);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
    setOpenModal(false);
  };

  // Restaurant actions
  const handleDeleteRestaurant = (restaurantId) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      dispatch(deleteRestaurant(restaurantId));
    }
  };

  const handleUpdateStatus = (restaurantId) => {
    dispatch(updateRestaurantStatus({ restaurantId, jwt }));
  };

  // If no restaurant is found, show the create restaurant UI
  if (!usersRestaurant) {
    return (
      <div className="p-4">
        <Typography variant="h5" className="mb-4">
          Restaurant Dashboard
        </Typography>
        
        <Box className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
          <RestaurantIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }}/>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Restaurant Found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal()}
            sx={{ mt: 2 }}
          >
            Create Your First Restaurant
          </Button>
        </Box>
        
        {/* Restaurant Form Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="restaurant-modal-title"
        >
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-4xl">
            <RestaurantForm 
              handleClose={handleCloseModal}
              restaurant={null}
            />
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Typography variant="h5" className="mb-4">
        Restaurant Dashboard
      </Typography>
      
      {/* Restaurant Basic Information Section */}
      <Card className="p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Typography variant="h4" className="font-bold">
              {usersRestaurant.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" className="mt-1">
              {usersRestaurant.description}
            </Typography>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => handleUpdateStatus(usersRestaurant.restaurantId)}
              variant="contained"
              color={usersRestaurant.open ? "error" : "success"}
            >
              {usersRestaurant.open ? "Close Restaurant" : "Open Restaurant"}
            </Button>
            
            <Tooltip title="Edit Restaurant">
              <IconButton 
                onClick={() => handleOpenModal(usersRestaurant)}
                color="primary"
              >
                <Edit />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Delete Restaurant">
              <IconButton 
                onClick={() => handleDeleteRestaurant(usersRestaurant.restaurantId)}
                color="error"
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        
        {/* Restaurant Images */}
        <Typography variant="subtitle1" className="mb-2 font-medium">
          Restaurant Images
        </Typography>
        <div className="flex gap-3 flex-wrap mb-4">
          {usersRestaurant.images?.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`${usersRestaurant.name} - Image ${index+1}`} 
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
        
        {/* Restaurant Details */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" className="mb-2 font-medium">
              Business Information
            </Typography>
            <div className="space-y-2">
              <div className="flex">
                <Typography variant="body2" className="w-32 text-gray-500">
                  Cuisine Type:
                </Typography>
                <Typography variant="body2">
                  {usersRestaurant.cuisineType}
                </Typography>
              </div>
              <div className="flex">
                <Typography variant="body2" className="w-32 text-gray-500">
                  Opening Hours:
                </Typography>
                <Typography variant="body2">
                  {usersRestaurant.openingHours}
                </Typography>
              </div>
              <div className="flex">
                <Typography variant="body2" className="w-32 text-gray-500">
                  Address:
                </Typography>
                <Typography variant="body2">
                  {usersRestaurant.address}
                </Typography>
              </div>
            </div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" className="mb-2 font-medium">
              Contact Information
            </Typography>
            <div className="space-y-2">
              <div className="flex">
                <Typography variant="body2" className="w-32 text-gray-500">
                  Email:
                </Typography>
                <Typography variant="body2">
                  {usersRestaurant.contactInformation?.email}
                </Typography>
              </div>
              <div className="flex">
                <Typography variant="body2" className="w-32 text-gray-500">
                  Mobile:
                </Typography>
                <Typography variant="body2">
                  {usersRestaurant.contactInformation?.mobile}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
      
      {/* Restaurant Form Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="restaurant-modal-title"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-4xl">
          <RestaurantForm 
            handleClose={handleCloseModal}
            restaurant={selectedRestaurant}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default RestaurantDashboard;