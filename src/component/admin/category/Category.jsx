import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Card, 
  CardHeader, 
  IconButton, 
  Modal, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CategoryForm from './CategoryForm';
import { deleteCategory } from '../../../redux/actions/restaurantActions';
import DeleteConfirmationDialog from "../../DeleteConfirmationDialog";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.restaurant.categories);
  const loading = useSelector((state) => state.restaurant.loading);
  const jwt = localStorage.getItem("jwt");
  
  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Modal open handler - accepts category for edit mode or null for create mode
  const handleOpenModal = (category = null) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  // Modal close handler
  const handleCloseModal = () => {
    setSelectedCategory(null);
    setOpenModal(false);
  };

  // Handle delete button click (opens dialog)
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  // Handle confirmed deletion
  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete.categoryId));
    }
  };

  return (
    <div className="p-4" data-testid="categories-container">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="mb-4">
          Category Management
        </Typography>

        <IconButton
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
          data-testid="add-category-button"
        >
          <Add />
        </IconButton>
      </Box>

      <Card className="shadow-md">
        <CardHeader
          title="Food Categories"
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
              {categories.map((item) => (
                <TableRow
                  hover
                  key={item.categoryId}
                  className="transition-colors hover:bg-gray-50"
                  data-testid={`category-row-${item.categoryId}`}
                >
                  <TableCell>{item.categoryId}</TableCell>
                  <TableCell data-testid={`category-name-${item.categoryId}`}>{item.name}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Edit Category">
                        <IconButton 
                          onClick={() => handleOpenModal(item)}
                          color="primary"
                          size="small"
                          data-testid={`edit-button-${item.categoryId}`}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Category">
                        <IconButton 
                          onClick={() => handleDeleteClick(item)}
                          color="error"
                          size="small"
                          data-testid={`delete-button-${item.categoryId}`}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
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

      {/* Shared Modal for Create/Update */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="category-modal-title"
        data-testid="category-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md">
          <CategoryForm 
            handleClose={handleCloseModal}
            category={selectedCategory}
          />
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        itemName={categoryToDelete?.name}
        contentText="This may affect menu items that are currently using this category. Are you sure you want to proceed?"
        data-testid="delete-dialog"
      />
    </div>
  );
};

export default Category;