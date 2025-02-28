import React, { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Avatar, 
  Chip, 
  AvatarGroup, 
  Modal,
  Paper,
  Tooltip
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useDispatch, useSelector } from "react-redux";
import { deleteRestaurant, getRestaurantByUserId, updateRestaurantStatus } from "../../../redux/actions/restaurantActions";
import RestaurantForm from "./RestaurantForm";

const RestaurantDashboard = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector(state => state);
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

  return (
    <div className="p-4">
      <Typography variant="h5" className="mb-4">
        My Restaurant
      </Typography>

      {restaurant.usersRestaurant ? (
        <Card className="shadow-md">
          <TableContainer component={Paper}>
            <Table aria-label="restaurant table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Images</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell align="center">
                    <AvatarGroup max={3}>
                      {restaurant.usersRestaurant.images.map((image, index) => (
                        <Avatar
                          key={index}
                          src={image}
                          alt={`Restaurant image ${index + 1}`}
                          sx={{ width: 60, height: 60 }}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">
                    {restaurant.usersRestaurant.name}
                  </TableCell>
                  <TableCell align="center">
                    {restaurant.usersRestaurant.description}
                  </TableCell>
                  <TableCell align="center">
                    {restaurant.usersRestaurant.address}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={restaurant.usersRestaurant.open ? "Open" : "Closed"}
                      color={restaurant.usersRestaurant.open ? "success" : "error"}
                      onClick={() => handleUpdateStatus(restaurant.usersRestaurant.restaurantId)}
                      className="cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Edit Restaurant">
                        <IconButton 
                          onClick={() => handleOpenModal(restaurant.usersRestaurant)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Restaurant">
                        <IconButton 
                          onClick={() => handleDeleteRestaurant(restaurant.usersRestaurant.restaurantId)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      ) : (
        <Box className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
          <RestaurantIcon sx={{ fontSize: 60, color: 'primary.main', marginBottom: 2 }}/>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Restaurant Found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenModal()}
            sx={{ mt: 2 }}
          >
            Create Your First Restaurant
          </Button>
        </Box>
      )}

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