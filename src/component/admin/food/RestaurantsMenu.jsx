import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardHeader, 
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
  Modal,
  Paper,
  Tooltip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  deleteFoodAction, 
  getMenuItemsByRestaurantId, 
  updateMenuItemsAvailability 
} from '../../../redux/actions/menuActions';
import MenuItemForm from './MenuItemForm';
import GlobalLoading from "../../GlobalLoading";

const RestaurantsMenu = () => {
  const dispatch = useDispatch();
  const { menu, restaurant } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  // Fetch menu items on component mount
  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant?.restaurantId,
        jwt,
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        foodCategory: ""
      }));
    }
  }, [dispatch, restaurant.usersRestaurant, jwt]);

  // Modal handlers
  const handleOpenModal = (menuItem = null) => {
    setSelectedMenuItem(menuItem);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMenuItem(null);
    setOpenModal(false);
  };

  // Menu item actions
  const handleFoodAvailability = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt }));
  };

  const handleDeleteFood = (foodId) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      dispatch(deleteFoodAction({ foodId, jwt }));
    }
  };

  return (
    <div className="p-4">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5">Menu Items</Typography>
        <IconButton
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
        >
          <Add />
        </IconButton>
      </Box>

      <Card className="shadow-md">
        <CardHeader
          title="All Menu Items"
          className="border-b"
        />
        
        <TableContainer component={Paper} className="max-h-[70vh]">
          <Table stickyHeader aria-label="menu items table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ingredients</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Availability</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.length > 0 ? (
                menu.menuItems.map((item) => (
                  <TableRow
                    key={item.foodId}
                    hover
                    className="transition-colors hover:bg-gray-50"
                  >
                    <TableCell>
                      <Avatar alt={item.name} src={item.image} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{item.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {item.ingredients && item.ingredients.map((ingredient, index) => (
                        <span key={ingredient.ingredientsItemId}>
                          {ingredient.name}
                          {index !== item.ingredients.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      €{item.price}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={item.available ? "In Stock" : "Out of Stock"}
                        color={item.available ? "success" : "error"}
                        size="small"
                        onClick={() => handleFoodAvailability(item.foodId)}
                        className="cursor-pointer min-w-24"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="Edit Menu Item">
                          <IconButton
                            onClick={() => handleOpenModal(item)}
                            color="primary"
                            size="small"
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Menu Item">
                          <IconButton
                            onClick={() => handleDeleteFood(item.foodId)}
                            color="error"
                            size="small"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No menu items found. Create your first menu item.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loading */}
      <GlobalLoading loading={menu.loading} />

      {/* Menu Item Form Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="menu-item-modal-title"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-4xl">
          <MenuItemForm 
            handleClose={handleCloseModal}
            menuItem={selectedMenuItem}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default RestaurantsMenu;