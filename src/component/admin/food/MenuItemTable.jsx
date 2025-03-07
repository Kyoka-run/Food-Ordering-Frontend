import {
  Avatar,
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
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
  updateMenuItemsAvailability,
} from "../../../redux/actions/menuActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Add } from "@mui/icons-material";
import GlobalLoading from "../../GlobalLoading";

const MenuItemTable = ({ isDashboard, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.menuItems);
  const loading = useSelector((state) => state.menu.loading);
  const restaurantId = useSelector((state) => state.restaurant.usersRestaurant?.restaurantId);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if(restaurantId) {
      dispatch(getMenuItemsByRestaurantId({
        restaurantId,
        jwt,
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        foodCategory: "",
      }));
    }
  }, [dispatch, restaurantId, jwt]);

  const handleFoodAvailability = (foodId) => {
    dispatch(updateMenuItemsAvailability({foodId, jwt}));
  };

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({foodId, jwt}));
  };

  const handleUpdateFood = (foodId) => {
    navigate(`/admin/restaurant/menu/update/${foodId}`);
  };

  const handleAddMenuItem = () => {
    navigate("/admin/restaurant/add-menu");
  };

  return (
    <Box width={"100%"} data-testid="menu-item-table">
      {/* Card header section with title and add menu item button */}
      <Card className="mt-1">
        <CardHeader
          title={name || "Menu Items"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={
            <IconButton 
              onClick={handleAddMenuItem}
              data-testid="add-menu-item-button"
            >
              <Add />
            </IconButton>
          }
          data-testid="card-header"
        />

        {/* Main table section displaying menu items */}
        <TableContainer>
          <Table aria-label="menu items table">
            {/* Table header defining columns */}
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "" }}>
                    Ingredients
                  </TableCell>
                )}
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Availability</TableCell>
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                )}
              </TableRow>
            </TableHead>

            {/* Table body with menu items data */}
            <TableBody>
              {menuItems?.length > 0 ? (
                menuItems.map((item) => (
                  <TableRow
                    hover
                    key={item.foodId}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                    data-testid={`menu-item-row-${item.foodId}`}
                  >
                    {/* Item image column */}
                    <TableCell>
                      <Avatar 
                        alt={item.name} 
                        src={item.image}
                        data-testid={`menu-item-image-${item.foodId}`}
                      />
                    </TableCell>

                    {/* Item title and description column */}
                    <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography 
                          sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
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
                      </Box>
                    </TableCell>

                    {/* Ingredients column */}
                    {!isDashboard && (
                      <TableCell data-testid={`menu-item-ingredients-${item.foodId}`}>
                        {item.ingredients && item.ingredients.map((ingredient, index) => (
                          <span key={ingredient.ingredientsItemId || index}>
                            {ingredient.name}
                            {index !== item.ingredients.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </TableCell>
                    )}

                    {/* Price column */}
                    <TableCell 
                      sx={{ textAlign: "center" }}
                      data-testid={`menu-item-price-${item.foodId}`}
                    >
                      €{item.price}
                    </TableCell>

                    {/* Availability toggle column */}
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        color={item.available ? "success" : "error"}
                        variant="text"
                        onClick={() => handleFoodAvailability(item.foodId)}
                        data-testid={`menu-item-availability-${item.foodId}`}
                      >
                        {item.available ? "in stock" : "out of stock"}
                      </Button>
                    </TableCell>

                    {/* Delete action column - only shown in full view */}
                    {!isDashboard && (
                      <TableCell sx={{ textAlign: "center" }}>
                        <IconButton
                          onClick={() => handleUpdateFood(item.foodId)}
                          color="primary"
                          data-testid={`edit-button-${item.foodId}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteFood(item.foodId)}
                          color="error"
                          data-testid={`delete-button-${item.foodId}`}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={isDashboard ? 4 : 6} 
                    align="center"
                    data-testid="no-items-message"
                  >
                    <Typography variant="body1" color="text.secondary" className="py-4">
                      No menu items found. Add your first menu item.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loading */}
      <GlobalLoading loading={loading} />
    </Box>
  );
};

export default MenuItemTable;