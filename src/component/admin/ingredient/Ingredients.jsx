import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import CreateIngredientCategoryForm from "./CreateIngredientCategory";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { updateStockOfIngredient, getIngredientCategory, getIngredientsOfRestaurant  } from "../../../redux/actions/ingredientActions";
import UpdateIngredientForm from "../ingredient/UpdateIngredientForm";
import UpdateIngredientCategoryForm from "../ingredient/UpdateIngredientCategoryForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Ingredients = () => {
  const dispatch = useDispatch();
  const { restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [openIngredientCategory, setOpenIngredientCategory] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);
  const [openUpdateIngredient, setOpenUpdateIngredient] = useState(false);
  const [openUpdateIngredientCategory, setOpenUpdateIngredientCategory] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedIngredientCategory, setSelectedIngredientCategory] = useState(null);

  const handleOpenIngredientCategory = () => setOpenIngredientCategory(true);
  const handleCloseIngredientCategory = () => setOpenIngredientCategory(false);
  const handleOpenIngredient = () => setOpenIngredient(true);
  const handleCloseIngredient = () => setOpenIngredient(false);

  const handleOpenUpdateIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setOpenUpdateIngredient(true);
  };

  const handleOpenUpdateIngredientCategory = (category) => {
    setSelectedIngredientCategory(category);
    setOpenUpdateIngredientCategory(true);
  };

  const handleCloseUpdateIngredient = () => {
    setSelectedIngredient(null);
    setOpenUpdateIngredient(false);
  };

  const handleCloseUpdateIngredientCategory = () => {
    setSelectedIngredientCategory(null);
    setOpenUpdateIngredientCategory(false);
  };

  const handleUpdateStock = (ingredientsItemId) => {
    dispatch(updateStockOfIngredient({ ingredientsItemId, jwt }));
  };

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(getIngredientCategory({ 
        jwt, 
        id: restaurant.usersRestaurant?.restaurantId 
      }));
      dispatch(getIngredientsOfRestaurant({ 
        jwt, 
        id: restaurant.usersRestaurant?.restaurantId 
      }));
    }
  }, [restaurant.usersRestaurant]);

  return (
    <div className="px-2">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Card className="mt-1">
            <CardHeader
              title={"Ingredients"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={handleOpenIngredient}>
                  <Add />
                </IconButton>
              }
            />
            <TableContainer className="h-[60vh] overflow-y-scroll">
              <Table aria-label="ingredients table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Availability</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.ingredients.map((item) => (
                    <TableRow
                      hover
                      key={item.ingredientsItemId}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell>{item?.ingredientsItemId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.ingredientCategoryName}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleUpdateStock(item.ingredientsItemId)}
                          color={item.inStock ? "success" : "primary"}
                        >
                          {item.inStock ? "in stock" : "out of stock"}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleOpenUpdateIngredient(item)}>
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card className="mt-1">
            <CardHeader
              title={"Category"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={handleOpenIngredientCategory}>
                  <Add />
                </IconButton>
              }
            />
            <TableContainer className="h-[60vh] overflow-y-scroll">
              <Table aria-label="category table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.category?.map((item) => (
                    <TableRow
                      hover
                      key={item.ingredientCategoryId}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell>{item?.ingredientCategoryId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleOpenUpdateIngredientCategory(item)}>
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <Modal
        open={openIngredient}
        onClose={handleCloseIngredient}
      >
        <Box sx={style}>
          <CreateIngredientForm handleClose={handleCloseIngredient} />
        </Box>
      </Modal>

      <Modal
        open={openIngredientCategory}
        onClose={handleCloseIngredientCategory}
      >
        <Box sx={style}>
          <CreateIngredientCategoryForm handleClose={handleCloseIngredientCategory} />
        </Box>
      </Modal>

      <Modal
        open={openUpdateIngredient}
        onClose={handleCloseUpdateIngredient}
      >
        <Box sx={style}>
          <UpdateIngredientForm 
            handleClose={handleCloseUpdateIngredient}
            selectedIngredient={selectedIngredient}
          />
        </Box>
      </Modal>

      <Modal
        open={openUpdateIngredientCategory}
        onClose={handleCloseUpdateIngredientCategory}
      >
        <Box sx={style}>
          <UpdateIngredientCategoryForm 
            handleClose={handleCloseUpdateIngredientCategory}
            selectedIngredientCategory={selectedIngredientCategory}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Ingredients;