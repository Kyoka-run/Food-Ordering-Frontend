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
  const { restaurants } = useSelector((state) => state.restaurant);

  return (
    <Box className="p-4">
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" className="text-gray-600">
              Restaurant Management
            </Typography>
          }
          sx={{
            pt: 2,
            "& .MuiCardHeader-action": { mt: 0.6 }
          }}
        />
        <TableContainer className="max-h-[70vh] overflow-auto">
          <Table stickyHeader>
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
                >
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <AvatarGroup max={3}>
                        {restaurant.images?.map((image, index) => (
                          <Avatar
                            key={index}
                            src={image}
                            alt={restaurant.name}
                          />
                        ))}
                      </AvatarGroup>
                      <div>
                        <Typography variant="subtitle2">
                          {restaurant.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          ID: {restaurant.restaurantId}
                        </Typography>
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {restaurant.owner?.username}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {restaurant.owner?.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {restaurant.address}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={restaurant.cuisineType}
                      color="primary"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={restaurant.open ? "OPEN" : "CLOSED"}
                      color={restaurant.open ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default SuperAdminRestaurant;