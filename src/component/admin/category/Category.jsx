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
  Button 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CategoryForm from './CategoryForm';
import { deleteCategory } from '../../../redux/actions/restaurantActions';

const Category = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  
  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // Handle category deletion
  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category? This may affect menu items using this category.")) {
      dispatch(deleteCategory(categoryId));
    }
  };

  return (
    <div className="p-4">
      <Box className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Food Categories</h1>
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
          title="Food Categories"
          className="border-b"
        />
        
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
              {restaurant.categories.map((item) => (
                <TableRow
                  hover
                  key={item.categoryId}
                  className="transition-colors hover:bg-gray-50"
                >
                  <TableCell>{item.categoryId}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Edit Category">
                        <IconButton 
                          onClick={() => handleOpenModal(item)}
                          color="primary"
                          size="small"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Category">
                        <IconButton 
                          onClick={() => handleDeleteCategory(item.categoryId)}
                          color="error"
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {restaurant.categories.length === 0 && (
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

      {/* Shared Modal for Create/Update */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="category-modal-title"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md">
          <CategoryForm 
            handleClose={handleCloseModal}
            category={selectedCategory}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Category;