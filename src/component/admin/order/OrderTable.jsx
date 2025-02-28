import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
  CircularProgress,
  Collapse,
  IconButton,
  AvatarGroup
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../../redux/actions/restaurantOrderActions";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const orderStatusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" }
];

const OrderTable = ({ isDashboard, title }) => {
  const dispatch = useDispatch();
  const { restaurantsOrder } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  
  // Status menu state for each order
  const [statusMenuAnchor, setStatusMenuAnchor] = useState({});
  
  // Expanded row state
  const [expandedRows, setExpandedRows] = useState({});

  // Open status menu for a specific order
  const handleOpenStatusMenu = (event, orderId) => {
    event.stopPropagation();
    setStatusMenuAnchor({
      ...statusMenuAnchor,
      [orderId]: event.currentTarget
    });
  };

  // Close status menu for a specific order
  const handleCloseStatusMenu = (orderId) => {
    setStatusMenuAnchor({
      ...statusMenuAnchor,
      [orderId]: null
    });
  };

  // Toggle row expansion
  const toggleRowExpansion = (orderId) => {
    setExpandedRows({
      ...expandedRows,
      [orderId]: !expandedRows[orderId]
    });
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, orderStatus: status, jwt }));
    handleCloseStatusMenu(orderId);
  };

  // Get status chip color based on order status
  const getStatusChipColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "COMPLETED":
        return "success";
      case "CANCELLED":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader
        title={title || "Orders"}
        className="border-b"
      />
      
      {restaurantsOrder.loading ? (
        <Box className="flex justify-center items-center py-10">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} className="max-h-[70vh]">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell className="font-medium">Order ID</TableCell>
                <TableCell className="font-medium">Restaurant</TableCell>
                <TableCell className="font-medium">Items</TableCell>
                <TableCell className="font-medium">Total</TableCell>
                <TableCell className="font-medium" align="center">Status</TableCell>
                {!isDashboard && (
                  <TableCell className="font-medium" align="center">Actions</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantsOrder.orders.length > 0 ? (
                restaurantsOrder.orders
                  .slice(0, isDashboard ? 5 : restaurantsOrder.orders.length)
                  .map((order) => (
                    <React.Fragment key={order.orderId}>
                      {/* Main Order Row */}
                      <TableRow 
                        hover
                        onClick={() => toggleRowExpansion(order.orderId)} 
                        className={`cursor-pointer transition-colors hover:bg-gray-50 ${expandedRows[order.orderId] ? 'bg-gray-50' : ''}`}
                      >
                        <TableCell padding="checkbox">
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRowExpansion(order.orderId);
                            }}
                          >
                            {expandedRows[order.orderId] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell>#{order.orderId}</TableCell>
                        <TableCell>
                          <Typography variant="body2" className="font-medium">
                            {order.restaurantName}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            User ID: {order.userId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <AvatarGroup max={3} className="justify-start">
                            {order.items.map((item) => (
                              <Tooltip 
                                key={item.orderItemId || item.foodId} 
                                title={`${item.foodName} (x${item.quantity})`}
                              >
                                <Avatar 
                                  alt={item.foodName} 
                                  src={item.foodImage} 
                                  className="w-8 h-8"
                                />
                              </Tooltip>
                            ))}
                          </AvatarGroup>
                          <Typography variant="caption" display="block" className="mt-1">
                            {order.items.length} item(s)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" className="font-medium">
                            €{order.amount || order.totalAmount}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            {order.paymentStatus || "Not Processed"}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={order.orderStatus}
                            color={getStatusChipColor(order.orderStatus)}
                            size="small"
                            className="min-w-24"
                          />
                        </TableCell>
                        {!isDashboard && (
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={(e) => handleOpenStatusMenu(e, order.orderId)}
                            >
                              Update Status
                            </Button>
                            <Menu
                              anchorEl={statusMenuAnchor[order.orderId]}
                              open={Boolean(statusMenuAnchor[order.orderId])}
                              onClose={() => handleCloseStatusMenu(order.orderId)}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {orderStatusOptions.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  onClick={() => handleUpdateOrderStatus(order.orderId, option.value)}
                                  disabled={order.orderStatus === option.value}
                                  selected={order.orderStatus === option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Menu>
                          </TableCell>
                        )}
                      </TableRow>

                      {/* Expandable Items Row */}
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={isDashboard ? 6 : 7}>
                          <Collapse in={expandedRows[order.orderId]} timeout="auto" unmountOnExit>
                            <Box className="p-4">
                              <Typography variant="subtitle2" className="mb-2 font-medium">
                                Order Items
                              </Typography>
                              
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Food Name</TableCell>
                                    <TableCell>Ingredients</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {order.items.map((item) => (
                                    <TableRow key={item.orderItemId || item.foodId}>
                                      <TableCell>
                                        <Avatar 
                                          src={item.foodImage} 
                                          alt={item.foodName}
                                          variant="rounded"
                                          className="w-12 h-12"
                                        />
                                      </TableCell>
                                      <TableCell>{item.foodName}</TableCell>
                                      <TableCell>
                                        {item.ingredients && item.ingredients.length > 0 ? (
                                          <Typography variant="caption">
                                            {item.ingredients.join(', ')}
                                          </Typography>
                                        ) : (
                                          <Typography variant="caption" className="text-gray-400">
                                            No ingredients
                                          </Typography>
                                        )}
                                      </TableCell>
                                      <TableCell align="right">{item.quantity}</TableCell>
                                      <TableCell align="right">€{item.totalPrice}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={isDashboard ? 6 : 7} 
                    className="text-center py-8 text-gray-500"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

export default OrderTable;