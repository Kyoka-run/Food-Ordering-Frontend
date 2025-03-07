import React, { useEffect, useState } from 'react';
import { 
  Box, 
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
import DeleteConfirmationDialog from "../../DeleteConfirmationDialog";

const RestaurantsMenu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.menuItems);
  const loading = useSelector((state) => state.menu.loading);
  const restaurantId = useSelector((state) => state.restaurant.usersRestaurant?.restaurantId);
  const jwt = localStorage.getItem("jwt");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch menu items on component mount
  useEffect(() => {
    if (restaurantId) {
      dispatch(getMenuItemsByRestaurantId({
        restaurantId,
        jwt,
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        foodCategory: ""
      }));
    }
  }, [dispatch, restaurantId, jwt]);

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
  const handleUpdateAvailability = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt }));
  };

  // Handle delete button click (opens dialog)
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  // Handle confirmed deletion
  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteFoodAction({ foodId: itemToDelete.foodId, jwt }));
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="p-4" data-testid="restaurants-menu-container">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5">Menu Items</Typography>
        <IconButton
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          data-testid="add-menu-item-button"
        >
          <Add />
        </IconButton>
      </Box>

      <Card className="shadow-md">
        <CardHeader
          title="All Menu Items"
          className="border-b"
          data-testid="menu-items-card-header"
        />
        
        <TableContainer component={Paper} className="max-h-[70vh]">
          <Table stickyHeader aria-label="menu items table" data-testid="menu-items-table">
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
              {menuItems.length > 0 ? (
                menuItems.map((item) => (
                  <TableRow
                    key={item.foodId}
                    hover
                    className="transition-colors hover:bg-gray-50"
                    data-testid={`menu-item-row-${item.foodId}`}
                  >
                    <TableCell>
                      <Avatar 
                        alt={item.name} 
                        src={item.image}
                        data-testid={`menu-item-image-${item.foodId}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="subtitle2"
                        data-testid={`menu-item-name-${item.foodId}`}
                      >
                        {item.name}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        data-testid={`menu-item-description-${item.foodId}`}
                      >
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell data-testid={`menu-item-ingredients-${item.foodId}`}>
                      {item.ingredients && item.ingredients.map((ingredient, index) => (
                        <span key={ingredient.ingredientsItemId || index}>
                          {ingredient.name}
                          {index !== item.ingredients.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell 
                      align="center"
                      data-testid={`menu-item-price-${item.foodId}`}
                    >
                      €{item.price}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={item.available ? "In Stock" : "Out of Stock"}
                        color={item.available ? "success" : "error"}
                        size="small"
                        onClick={() => handleUpdateAvailability(item.foodId)}
                        className="cursor-pointer min-w-24"
                        data-testid={`menu-item-availability-${item.foodId}`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="Edit Menu Item">
                          <IconButton
                            onClick={() => handleOpenModal(item)}
                            color="primary"
                            size="small"
                            data-testid={`edit-button-${item.foodId}`}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Menu Item">
                          <IconButton
                            onClick={() => handleDeleteClick(item)}
                            color="error"
                            size="small"
                            data-testid={`delete-button-${item.foodId}`}
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
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500" data-testid="no-menu-items-message">
                    No menu items found. Create your first menu item.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loading */}
      <GlobalLoading loading={loading} />

      {/* Menu Item Form Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="menu-item-modal-title"
        data-testid="menu-item-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-4xl">
          <MenuItemForm 
            handleClose={handleCloseModal}
            menuItem={selectedMenuItem}
          />
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Menu Item"
        itemName={itemToDelete?.name}
        contentText="This menu item will be permanently removed from your restaurant's offerings."
        data-testid="delete-dialog"
      />
    </div>
  );
};

export default RestaurantsMenu;