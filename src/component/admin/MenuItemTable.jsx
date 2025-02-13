import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
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
} from "../../redux/actions/menuActions";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { categorizedIngredients } from "../../util/CategorizeIngredients";
import DeleteIcon from "@mui/icons-material/Delete";
import { Create } from "@mui/icons-material";

const MenuItemTable = ({ isDashboard, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menu, ingredients, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
      if(restaurant.usersRestaurant){
       dispatch( getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant?.restaurantId,
        jwt: localStorage.getItem("jwt"),
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
              <Create />
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
                    <Avatar alt={item.name} src={item.images[0]} />
                  </TableCell>

                  {/* Item title and description column */}
                  <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}>
                        {item.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Ingredients column - only shown in full view */}
                  {!isDashboard && (
                    <TableCell>
                      {Object.keys(
                        categorizedIngredients(item?.ingredients)
                      )?.map((category) => (
                        <div key={category}>
                          <p className="font-semibold">{category}</p>
                          <div className="pl-5">
                            {categorizedIngredients(item?.ingredients)[
                              category
                            ].map((ingredient, index) => (
                              <div
                                key={ingredient.id}
                                className="flex gap-1 items-center"
                              >
                                <div>
                                  <HorizontalRuleIcon
                                    sx={{ fontSize: "1rem" }}
                                  />
                                </div>
                                <div
                                  key={ingredient.id}
                                  className="flex gap-4 items-center"
                                >
                                  <p>{ingredient.name}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                  )}

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
                      <IconButton onClick={() => handleDeleteFood(item.foodId)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Loading backdrop shown during data fetching */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menu.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default MenuItemTable;
