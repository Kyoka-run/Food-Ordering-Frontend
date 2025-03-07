import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Chip,
  AvatarGroup
} from '@mui/material';
import { useSelector } from 'react-redux';

const SuperAdminRestaurant = () => {
  const restaurants = useSelector((state) => state.restaurant.restaurants);
  const loading = useSelector((state) => state.restaurant.loading);

  return (
    <Box className="p-4" data-testid="restaurant-management">
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" className="text-gray-600" data-testid="card-title">
              Restaurant Management
            </Typography>
          }
          sx={{
            pt: 2,
            "& .MuiCardHeader-action": { mt: 0.6 }
          }}
          data-testid="card-header"
        />
        <TableContainer className="max-h-[70vh] overflow-auto">
          <Table stickyHeader data-testid="restaurants-table">
            <TableHead>
              <TableRow>
                <TableCell>Restaurant</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Cuisine Type</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurants.map((restaurant) => (
                <TableRow
                  hover
                  key={restaurant.restaurantId}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  data-testid={`restaurant-row-${restaurant.restaurantId}`}
                >
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <AvatarGroup max={3}>
                        {restaurant.images?.slice(0, 3).map((image, index) => (
                          <Avatar
                            key={index}
                            src={image}
                            alt={restaurant.name}
                            data-testid={`restaurant-image-${restaurant.restaurantId}-${index}`}
                          />
                        ))}
                      </AvatarGroup>
                      <div>
                        <Typography variant="subtitle2" data-testid={`restaurant-name-${restaurant.restaurantId}`}>
                          {restaurant.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" data-testid={`restaurant-id-${restaurant.restaurantId}`}>
                          ID: {restaurant.restaurantId}
                        </Typography>
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" data-testid={`restaurant-owner-${restaurant.restaurantId}`}>
                      {restaurant.owner?.username}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" data-testid={`restaurant-owner-email-${restaurant.restaurantId}`}>
                      {restaurant.owner?.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" data-testid={`restaurant-location-${restaurant.restaurantId}`}>
                    <Typography variant="body2">
                      {restaurant.address}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={restaurant.cuisineType}
                      color="primary"
                      size="small"
                      data-testid={`restaurant-cuisine-${restaurant.restaurantId}`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={restaurant.open ? "OPEN" : "CLOSED"}
                      color={restaurant.open ? "success" : "error"}
                      size="small"
                      data-testid={`restaurant-status-${restaurant.restaurantId}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {restaurants.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500" data-testid="no-restaurants-message">
                    No restaurants found.
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

export default SuperAdminRestaurant;