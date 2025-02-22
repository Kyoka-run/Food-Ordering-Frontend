import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Box,
  Avatar,
  AvatarGroup,
  Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteRestaurant, updateRestaurantStatus } from '../../../redux/actions/restaurantActions';

const RestaurantTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const handleDeleteRestaurant = (restaurantId) => {
    dispatch(deleteRestaurant(restaurantId));
  };

  const handleUpdateRestaurant = (restaurantId) => {
    navigate(`/admin/restaurant/update/${restaurantId}`);
  };

  const handleUpdateStatus = (restaurantId) => {
    dispatch(updateRestaurantStatus({ restaurantId, jwt }));
  };

  return (
    <Box width={"100%"}>
      <Card className="w-full">
        <CardHeader
          title="My Restaurant"
          sx={{
            pt: 2,
            textAlign: 'center',
            '& .MuiCardHeader-content': {
              display: 'flex',
              justifyContent: 'center'
            }
          }}
        />
        <TableContainer>
          <Table aria-label="restaurant table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Images</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.usersRestaurant && (
                <TableRow
                  hover
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <TableCell align="center">
                    <AvatarGroup max={3}>
                      {restaurant.usersRestaurant.images.map((image, index) => (
                        <Avatar
                          key={index}
                          src={image}
                          alt={`Restaurant image ${index + 1}`}
                          sx={{ width: 60, height: 60 }}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">
                    {restaurant.usersRestaurant.name}
                  </TableCell>
                  <TableCell align="center">
                    {restaurant.usersRestaurant.description}
                  </TableCell>
                  <TableCell align="center">
                    {restaurant.usersRestaurant.address}, 
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={restaurant.usersRestaurant.open ? "Open" : "Closed"}
                      color={restaurant.usersRestaurant.open ? "success" : "error"}
                      onClick={() => handleUpdateStatus(restaurant.usersRestaurant.restaurantId)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton 
                        onClick={() => handleUpdateRestaurant(restaurant.usersRestaurant.restaurantId)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeleteRestaurant(restaurant.usersRestaurant.restaurantId)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default RestaurantTable;