import React, { useEffect } from "react";
import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Grid,
  Paper
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../../redux/actions/restaurantOrderActions";
import OrderTable from "./OrderTable";

const orderStatusFilters = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" }
];

const RestaurantsOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurant, restaurantsOrder } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");

  // Get current status filter from URL query params
  const searchParams = new URLSearchParams(location.search);
  const currentStatusFilter = searchParams.get("order_status") || "all";

  // Fetch orders based on current filter when component mounts or filter changes
  useEffect(() => {
    if (restaurant.usersRestaurant?.restaurantId) {
      dispatch(fetchRestaurantsOrder({
        restaurantId: restaurant.usersRestaurant.restaurantId,
        orderStatus: currentStatusFilter !== "all" ? currentStatusFilter : null,
        jwt
      }))
    }
  }, [dispatch, restaurant.usersRestaurant, currentStatusFilter, jwt]);

  // Handle filter change
  const handleFilterChange = (event) => {
    const value = event.target.value;
    const searchParams = new URLSearchParams(location.search);
    
    if (value === "all") {
      searchParams.delete("order_status");
    } else {
      searchParams.set("order_status", value);
    }
    
    navigate({ search: searchParams.toString() });
  };

  return (
    <div className="p-4">
      <Typography variant="h5" className="mb-4">
        Orders Management
      </Typography>
      
      <Grid container spacing={3}>
        {/* Filter Card */}
        <Grid item xs={12}>
          <Paper className="p-4 mb-4">
            <Typography variant="h6" className="mb-2">
              Filter by Status
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={currentStatusFilter}
                onChange={handleFilterChange}
              >
                {orderStatusFilters.map((filter) => (
                  <FormControlLabel
                    key={filter.value}
                    value={filter.value}
                    control={<Radio color="primary" />}
                    label={filter.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>
        
        {/* Order Stats */}
        <Grid item xs={12} md={4}>
          <Card className="p-4 bg-blue-50 h-full">
            <Typography variant="h6" gutterBottom>
              Total Orders
            </Typography>
            <Typography variant="h4">
              {restaurantsOrder.orders.length}
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card className="p-4 bg-yellow-50 h-full">
            <Typography variant="h6" gutterBottom>
              Pending Orders
            </Typography>
            <Typography variant="h4">
              {restaurantsOrder.orders.filter(order => order.orderStatus === "PENDING").length}
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card className="p-4 bg-green-50 h-full">
            <Typography variant="h6" gutterBottom>
              Completed Orders
            </Typography>
            <Typography variant="h4">
              {restaurantsOrder.orders.filter(order => order.orderStatus === "COMPLETED").length}
            </Typography>
          </Card>
        </Grid>
        
        {/* Orders Table */}
        <Grid item xs={12}>
          <OrderTable 
            title={`${currentStatusFilter !== "all" 
              ? orderStatusFilters.find(f => f.value === currentStatusFilter)?.label 
              : "All Orders"}`} 
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantsOrder;