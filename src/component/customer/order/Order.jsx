import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../../redux/actions/orderActions';
import OrderCard from './OrderCard';
import GlobalLoading from "../../GlobalLoading";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);
  const loading = useSelector(state => state.order.loading);
  const jwt = localStorage.getItem("jwt");

  // Fetch user orders on component mount
  useEffect(() => {
    dispatch(getUserOrders(jwt));
  }, [dispatch, jwt]);

  return (
    <Box className="max-w-3xl mx-auto" data-testid="orders-container">
      <h1 className='py-5 text-xl font-semibold text-center'>My Orders</h1>
      
      {/* Loading */}
      <GlobalLoading loading={loading} />
      
      {/* Empty state */}
      {!loading && orders.length === 0 && (
        <Box className="text-center py-8" data-testid="no-orders-message">
          <Typography variant="body1" color="text.secondary">
            You haven't placed any orders yet.
          </Typography>
        </Box>
      )}
      
      {/* Orders list */}
      {orders.length > 0 && (
        <Box data-testid="orders-list">
          {/* Order summary */}
          <Box className="bg-gray-50 p-4 rounded-lg mb-4" data-testid="orders-summary">
            <Typography variant="subtitle1" className="mb-2">
              Order Summary
            </Typography>
            <Box className="flex justify-between mb-1">
              <Typography variant="body2">Total Orders</Typography>
              <Typography variant="body2" className="font-medium" data-testid="total-orders-count">
                {orders.length}
              </Typography>
            </Box>
            <Box className="flex justify-between">
              <Typography variant="body2">Recent Orders</Typography>
              <Typography variant="body2" className="font-medium" data-testid="pending-orders-count">
                {orders.filter(o => o.orderStatus === 'PENDING').length} pending
              </Typography>
            </Box>
          </Box>
          
          <Divider className="mb-4" />
          
          {/* Order cards */}
          <Box className="space-y-4">
            {orders.map((orderItem) => (
              <OrderCard key={orderItem.orderId} order={orderItem} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Orders;