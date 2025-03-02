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
  const { order } = useSelector(state => state);
  const jwt = localStorage.getItem("jwt");

  // Fetch user orders on component mount
  useEffect(() => {
    dispatch(getUserOrders(jwt));
  }, [dispatch, jwt]);

  return (
    <Box className="max-w-3xl mx-auto">
      <h1 className='py-5 text-xl font-semibold text-center'>My Orders</h1>
      
      {/* Loading */}
      <GlobalLoading loading={order.loading} />
      
      {/* Empty state */}
      {!order.loading && order.orders.length === 0 && (
        <Box className="text-center py-8">
          <Typography variant="body1" color="text.secondary">
            You haven't placed any orders yet.
          </Typography>
        </Box>
      )}
      
      {/* Orders list */}
      {order.orders.length > 0 && (
        <Box>
          {/* Order summary */}
          <Box className="bg-gray-50 p-4 rounded-lg mb-4">
            <Typography variant="subtitle1" className="mb-2">
              Order Summary
            </Typography>
            <Box className="flex justify-between mb-1">
              <Typography variant="body2">Total Orders</Typography>
              <Typography variant="body2" className="font-medium">{order.orders.length}</Typography>
            </Box>
            <Box className="flex justify-between">
              <Typography variant="body2">Recent Orders</Typography>
              <Typography variant="body2" className="font-medium">
                {order.orders.filter(o => o.orderStatus === 'PENDING').length} pending
              </Typography>
            </Box>
          </Box>
          
          <Divider className="mb-4" />
          
          {/* Order cards */}
          <Box className="space-y-4">
            {order.orders.map((orderItem) => (
              <OrderCard key={orderItem.orderId} order={orderItem} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Orders;