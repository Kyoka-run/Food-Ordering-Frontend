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
import GlobalLoading from "../../GlobalLoading";
import DeleteConfirmationDialog from "../../DeleteConfirmationDialog";

const Ingredients = () => {
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.restaurant.usersRestaurant?.restaurantId);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const categories = useSelector((state) => state.ingredients.category);
  const loading = useSelector((state) => state.ingredients.loading);
  const jwt = localStorage.getItem("jwt");

  // Modal states
  const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Delete confirmation dialog states
  const [deleteIngredientDialogOpen, setDeleteIngredientDialogOpen] = useState(false);
  const [deleteCategoryDialogOpen, setDeleteCategoryDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch ingredient data on component mount and when restaurant changes
  useEffect(() => {
    if (restaurantId) {
      dispatch(getIngredientCategory({ 
        jwt, 
        id: restaurantId 
      }));
      dispatch(getIngredientsOfRestaurant({ 
        jwt, 
        id: restaurantId 
      }));
    }
  }, [restaurantId, dispatch, jwt]);

  // Toggle ingredient stock status
  const handleUpdateStock = (ingredientsItemId) => {
    dispatch(updateStockOfIngredient({ ingredientsItemId, jwt }));
  };

  // Delete an ingredient (opens dialog)
  const handleDeleteIngredientClick = (ingredient) => {
    setItemToDelete(ingredient);
    setDeleteIngredientDialogOpen(true);
  };

  // Delete a category (opens dialog)
  const handleDeleteCategoryClick = (category) => {
    setItemToDelete(category);
    setDeleteCategoryDialogOpen(true);
  };

  // Confirm delete ingredient
  const handleConfirmIngredientDelete = () => {
    if (itemToDelete) {
      dispatch(deleteIngredient({ ingredientsItemId: itemToDelete.ingredientsItemId, jwt }));
    }
    setDeleteIngredientDialogOpen(false);
  };

  // Confirm delete category
  const handleConfirmCategoryDelete = () => {
    if (itemToDelete) {
      dispatch(deleteIngredientCategory({ ingredientCategoryId: itemToDelete.ingredientCategoryId, jwt }));
    }
    setDeleteCategoryDialogOpen(false);
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
    <div className="p-4" data-testid="ingredients-container">
      <Grid container spacing={4}>
        {/* Ingredients Table */}
        <Grid item xs={12} lg={8}>
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h5" className="mb-4">
              Ingredients Management
            </Typography>
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => handleOpenIngredientModal()}
              data-testid="add-ingredient-button"
            >
              <Add />
            </IconButton>
          </Box>
          <Card className="shadow-md">
            <CardHeader
              title="Ingredients"
              className="border-b"
              data-testid="ingredients-card-header"
            />
            <TableContainer component={Paper} className="max-h-[70vh]">
              <Table stickyHeader aria-label="ingredients table" data-testid="ingredients-table">
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
                  {ingredients.length > 0 ? (
                    ingredients.map((item) => (
                      <TableRow
                        hover
                        key={item.ingredientsItemId}
                        className="transition-colors hover:bg-gray-50"
                        data-testid={`ingredient-row-${item.ingredientsItemId}`}
                      >
                        <TableCell>{item.ingredientsItemId}</TableCell>
                        <TableCell data-testid={`ingredient-name-${item.ingredientsItemId}`}>{item.name}</TableCell>
                        <TableCell data-testid={`ingredient-category-${item.ingredientsItemId}`}>{item.ingredientCategoryName}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => handleUpdateStock(item.ingredientsItemId)}
                            color={item.inStock ? "success" : "primary"}
                            variant="outlined"
                            size="small"
                            className="min-w-24"
                            data-testid={`stock-button-${item.ingredientsItemId}`}
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
                                data-testid={`edit-button-${item.ingredientsItemId}`}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Ingredient">
                              <IconButton 
                                onClick={() => handleDeleteIngredientClick(item)}
                                color="error"
                                size="small"
                                className="hover:bg-red-50"
                                data-testid={`delete-button-${item.ingredientsItemId}`}
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
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500" data-testid="no-ingredients-message">
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
          <Typography variant="h5" className="mb-4">
            Categories
          </Typography>
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => handleOpenCategoryModal()}
              data-testid="add-category-button"
            >
              <Add />
            </IconButton>
          </Box>
          
          <Card className="shadow-md">
            <CardHeader
              title="Ingredient Categories"
              className="border-b"
              data-testid="categories-card-header"
            />
            <TableContainer component={Paper} className="max-h-[70vh]">
              <Table stickyHeader aria-label="categories table" data-testid="categories-table">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-medium">ID</TableCell>
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell align="center" className="font-medium">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.length > 0 ? (
                    categories.map((item) => (
                      <TableRow
                        hover
                        key={item.ingredientCategoryId}
                        className="transition-colors hover:bg-gray-50"
                        data-testid={`category-row-${item.ingredientCategoryId}`}
                      >
                        <TableCell>{item.ingredientCategoryId}</TableCell>
                        <TableCell data-testid={`category-name-${item.ingredientCategoryId}`}>{item.name}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Tooltip title="Edit Category">
                              <IconButton 
                                onClick={() => handleOpenCategoryModal(item)}
                                color="primary"
                                size="small"
                                className="hover:bg-blue-50"
                                data-testid={`edit-category-button-${item.ingredientCategoryId}`}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Category">
                              <IconButton 
                                onClick={() => handleDeleteCategoryClick(item)}
                                color="error"
                                size="small"
                                className="hover:bg-red-50"
                                data-testid={`delete-category-button-${item.ingredientCategoryId}`}
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
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500" data-testid="no-categories-message">
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

      {/* Loading */}
      <GlobalLoading loading={loading} />

      {/* Ingredient Modal */}
      <Modal
        open={openIngredientModal}
        onClose={handleCloseIngredientModal}
        aria-labelledby="ingredient-modal-title"
        data-testid="ingredient-modal"
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
        data-testid="category-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md">
          <IngredientCategoryForm 
            handleClose={handleCloseCategoryModal}
            category={selectedCategory}
          />
        </Box>
      </Modal>

      {/* Delete Ingredient Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteIngredientDialogOpen}
        onClose={() => setDeleteIngredientDialogOpen(false)}
        onConfirm={handleConfirmIngredientDelete}
        title="Delete Ingredient"
        itemName={itemToDelete?.name}
        contentText="This ingredient will be permanently removed from your inventory."
        data-testid="delete-ingredient-dialog"
      />

      {/* Delete Category Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteCategoryDialogOpen}
        onClose={() => setDeleteCategoryDialogOpen(false)}
        onConfirm={handleConfirmCategoryDelete}
        title="Delete Ingredient Category"
        itemName={itemToDelete?.name}
        contentText="This will permanently delete the category and may affect all ingredients in this category."
        data-testid="delete-category-dialog"
      />
    </div>
  );
};

export default Ingredients;