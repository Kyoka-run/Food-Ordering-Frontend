import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardHeader, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import CreateCategory from './CreateCategory';
import UpdateCategoryForm from './UpdateCategoryForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Category = () => {
  const { restaurant } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenCreateCategory = () => setOpenCreateCategory(true);
  const handleCloseCreateCategory = () => setOpenCreateCategory(false);
  
  const handleOpenUpdateCategory = (category) => {
    setSelectedCategory(category);
    setOpenUpdateCategory(true);
  };

  const handleCloseUpdateCategory = () => {
    setSelectedCategory(null);
    setOpenUpdateCategory(false);
  };

  return (
    <div>
      <Card className="mt-1">
        <CardHeader
          title={"Categories"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={<IconButton onClick={handleOpenCreateCategory}><Add/></IconButton>}
        />
        <TableContainer>
          <Table sx={{}} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((item) => (
                <TableRow
                  className="cursor-pointer"
                  hover
                  key={item.categoryId}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  <TableCell>{item?.categoryId}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenUpdateCategory(item)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Create Category Modal */}
      <Modal
        open={openCreateCategory}
        onClose={handleCloseCreateCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateCategory handleClose={handleCloseCreateCategory}/>
        </Box>
      </Modal>

      {/* Update Category Modal */}
      <Modal
        open={openUpdateCategory}
        onClose={handleCloseUpdateCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateCategoryForm
            handleClose={handleCloseUpdateCategory}
            selectedCategory={selectedCategory}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Category;