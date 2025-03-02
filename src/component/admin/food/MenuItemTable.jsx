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
  const { menu, ingredients, restaurant } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
      if(restaurant.usersRestaurant){
       dispatch( getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant?.restaurantId,
        jwt,
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        foodCategory: "",
        }));
      }
  }, [ingredients.update, restaurant.usersRestaurant]);

  const handleFoodAvailability = (foodId) => {
    dispatch(updateMenuItemsAvailability({foodId , jwt}));
  };

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({foodId, jwt}));
  };

  const handleUpdateFood = (foodId) => {
    navigate(`/admin/restaurant/menu/update/${foodId}`);
  };

  return (
    <Box width={"100%"}>
      {/* Card header section with title and add menu item button */}
      <Card className="mt-1">
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={
            <IconButton onClick={() => navigate("/admin/restaurant/add-menu")}>
              <Add />
            </IconButton>
          }
        />

        {/* Main table section displaying menu items */}
        <TableContainer>
          <Table aria-label="table in dashboard">
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
                <TableCell sx={{ textAlign: "center" }}>Availabilty</TableCell>
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                )}
              </TableRow>
            </TableHead>

            {/* Table body with menu items data */}
            <TableBody>
              {menu.menuItems?.map((item, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  {/* Item image column */}
                  <TableCell>
                    <Avatar alt={item.name} src={item.image} />
                  </TableCell>

                  {/* Item title and description column */}
                  <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}>
                        {item.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Ingredients column */}
                  <TableCell>
                    {item.ingredients.map((ingredient, index) => (
                      <span key={ingredient.ingredientsItemId}>
                        {ingredient.name}
                        {index !== item.ingredients.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </TableCell>

                  {/* Price column */}
                  <TableCell sx={{ textAlign: "center" }}>
                    €{item.price}
                  </TableCell>

                  {/* Availability toggle column */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      color={item.available ? "success" : "error"}
                      variant="text"
                      onClick={() => handleFoodAvailability(item.foodId)}
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
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteFood(item.foodId)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loading */}
      <GlobalLoading loading={menu.loading} />
    </Box>
  );
};

export default MenuItemTable;
