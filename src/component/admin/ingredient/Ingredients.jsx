import React, { useState, useEffect } from "react";
import {
  Box,
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
  Paper,
  Button,
  Tooltip,
  Typography
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { 
  updateStockOfIngredient, 
  getIngredientCategory, 
  getIngredientsOfRestaurant,
  deleteIngredient,
  deleteIngredientCategory
} from "../../../redux/actions/ingredientActions";
import IngredientForm from "./IngredientForm";
import IngredientCategoryForm from "./IngredientCategoryForm";

const Ingredients = () => {
  const dispatch = useDispatch();
  const { restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  // Modal states
  const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch ingredient data on component mount and when restaurant changes
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
  }, [restaurant.usersRestaurant, dispatch, jwt]);

  // Toggle ingredient stock status
  const handleUpdateStock = (ingredientsItemId) => {
    dispatch(updateStockOfIngredient({ ingredientsItemId, jwt }));
  };

  // Delete an ingredient
  const handleDeleteIngredient = (ingredientsItemId) => {
    if (window.confirm("Are you sure you want to delete this ingredient?")) {
      dispatch(deleteIngredient({ ingredientsItemId, jwt }));
    }
  };

  // Delete a category
  const handleDeleteCategory = (ingredientCategoryId) => {
    if (window.confirm("Are you sure you want to delete this category? This will affect all ingredients in this category.")) {
      dispatch(deleteIngredientCategory({ ingredientCategoryId, jwt }));
    }
  };

  // Modal handlers for Ingredients
  const handleOpenIngredientModal = (ingredient = null) => {
    setSelectedIngredient(ingredient);
    setOpenIngredientModal(true);
  };

  const handleCloseIngredientModal = () => {
    setSelectedIngredient(null);
    setOpenIngredientModal(false);
  };

  // Modal handlers for Categories
  const handleOpenCategoryModal = (category = null) => {
    setSelectedCategory(category);
    setOpenCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setSelectedCategory(null);
    setOpenCategoryModal(false);
  };

  return (
    <div className="p-4">
      <Typography variant="h5" className="mb-4">
        Ingredients Management
      </Typography>
      
      <Grid container spacing={4}>
        {/* Ingredients Table */}
        <Grid item xs={12} lg={8}>
          <Box className="flex justify-between items-center mb-2">
            <Typography variant="h6">Ingredients</Typography>
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => handleOpenIngredientModal()}
            >
              <Add />
            </IconButton>
          </Box>
          
          <Card className="shadow-md h-full">
            <TableContainer component={Paper} className="max-h-[70vh]">
              <Table stickyHeader aria-label="ingredients table">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-medium">ID</TableCell>
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell className="font-medium">Category</TableCell>
                    <TableCell align="center" className="font-medium">Availability</TableCell>
                    <TableCell align="center" className="font-medium">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.ingredients.map((item) => (
                    <TableRow
                      hover
                      key={item.ingredientsItemId}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <TableCell>{item.ingredientsItemId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.ingredientCategoryName}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleUpdateStock(item.ingredientsItemId)}
                          color={item.inStock ? "success" : "primary"}
                          variant="outlined"
                          size="small"
                          className="min-w-24"
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Tooltip title="Edit Ingredient">
                            <IconButton 
                              onClick={() => handleOpenIngredientModal(item)}
                              color="primary"
                              size="small"
                              className="hover:bg-blue-50"
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Ingredient">
                            <IconButton 
                              onClick={() => handleDeleteIngredient(item.ingredientsItemId)}
                              color="error"
                              size="small"
                              className="hover:bg-red-50"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {ingredients.ingredients.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No ingredients found. Create your first ingredient.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Categories Table */}
        <Grid item xs={12} lg={4}>
          <Box className="flex justify-between items-center mb-2">
            <Typography variant="h6">Ingredient Categories</Typography>
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => handleCategoryOpenModal()}
            >
              <Add />
            </IconButton>
          </Box>
          
          <Card className="shadow-md h-full">
            <TableContainer component={Paper} className="max-h-[70vh]">
              <Table stickyHeader aria-label="categories table">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-medium">ID</TableCell>
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell align="center" className="font-medium">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.category?.map((item) => (
                    <TableRow
                      hover
                      key={item.ingredientCategoryId}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <TableCell>{item.ingredientCategoryId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Tooltip title="Edit Category">
                            <IconButton 
                              onClick={() => handleOpenCategoryModal(item)}
                              color="primary"
                              size="small"
                              className="hover:bg-blue-50"
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Category">
                            <IconButton 
                              onClick={() => handleDeleteCategory(item.ingredientCategoryId)}
                              color="error"
                              size="small"
                              className="hover:bg-red-50"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {ingredients.category.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                        No categories found. Create your first category.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Ingredient Modal */}
      <Modal
        open={openIngredientModal}
        onClose={handleCloseIngredientModal}
        aria-labelledby="ingredient-modal-title"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md">
          <IngredientForm 
            handleClose={handleCloseIngredientModal}
            ingredient={selectedIngredient}
          />
        </Box>
      </Modal>

      {/* Category Modal */}
      <Modal
        open={openCategoryModal}
        onClose={handleCloseCategoryModal}
        aria-labelledby="category-modal-title"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md">
          <IngredientCategoryForm 
            handleClose={handleCloseCategoryModal}
            category={selectedCategory}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Ingredients;