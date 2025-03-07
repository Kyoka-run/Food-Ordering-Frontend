import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Collapse, 
  IconButton, 
  Divider, 
  Grid,
  Avatar
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  // Toggle collapse state
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Get status chip color based on order status
  const getStatusColor = (status) => {
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
    <Card className="mb-4 border border-gray-200 hover:shadow-md transition-shadow" data-testid={`order-card-${order.orderId}`}>
      {/* Order Summary - Always visible */}
      <CardContent className="pb-2">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className="font-medium" data-testid={`restaurant-name-${order.orderId}`}>
              {order.restaurantName}
            </Typography>
            <Typography variant="body2" color="text.secondary" data-testid={`order-id-${order.orderId}`}>
              Order #{order.orderId}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} className="flex justify-end space-x-2">
            <Box>
              <Typography variant="h6" className="text-right" data-testid={`order-amount-${order.orderId}`}>
                €{order.amount || order.totalAmount}
              </Typography>
              <Chip 
                label={order.orderStatus} 
                color={getStatusColor(order.orderStatus)}
                size="small"
                className="ml-auto"
                data-testid={`status-chip-${order.orderId}`}
              />
            </Box>
            <IconButton 
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              data-testid={`expand-button-${order.orderId}`}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>

      {/* Collapsible Details */}
      <Collapse in={expanded} timeout="auto" unmountOnExit data-testid={`expanded-details-${order.orderId}`}>
        <Divider />
        <CardContent>
          {/* Order Items */}
          <Typography variant="subtitle2" className="mb-2 font-medium">
            Order Items
          </Typography>
          
          {order.items.map((item) => (
            <Box 
              key={item.orderItemId || item.foodId} 
              className="flex items-center space-x-3 mb-2"
              data-testid={`order-item-${item.orderItemId || item.foodId}`}
            >
              <Avatar 
                src={item.foodImage} 
                alt={item.foodName}
                variant="rounded"
                className="w-12 h-12"
              />
              <Box className="flex-grow">
                <Typography variant="body2" data-testid={`item-name-${item.orderItemId || item.foodId}`}>
                  {item.foodName} × {item.quantity}
                </Typography>
                {item.ingredients && item.ingredients.length > 0 && (
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    data-testid={`item-ingredients-${item.orderItemId || item.foodId}`}
                  >
                    {item.ingredients.join(', ')}
                  </Typography>
                )}
              </Box>
              <Typography 
                variant="body2" 
                className="font-medium"
                data-testid={`item-price-${item.orderItemId || item.foodId}`}
              >
                €{item.totalPrice}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default OrderCard;