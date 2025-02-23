import { Button, Card } from "@mui/material";
import React from "react";

const OrderCard = ({order,status}) => {
  return (
    <Card className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-5">
        <p>{order.restaurantName}</p>
        <p className="text-gray-600">€{order.totalAmount}</p>
      </div>
    </Card>
  );
};

export default OrderCard;
