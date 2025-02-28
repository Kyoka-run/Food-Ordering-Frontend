import React, { useEffect } from "react";
import { Box, CircularProgress, Typography, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotification } from "../../../redux/actions/orderActions";

const Notification = () => {
  const dispatch = useDispatch();

  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserNotification());
  }, [dispatch]);

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-5 font-semibold">Notifications</h1>
      {/* Loading indicator */}
      {order.loading && (
        <Box className="flex justify-center py-8">
          <CircularProgress />
        </Box>
      )}
      
      {/* Empty state */}
      {!order.loading && order.notifications.length === 0 && (
        <Box className="text-center py-8">
          <Typography variant="body1" color="text.secondary">
            You don't have any notification.
          </Typography>
        </Box>
      )}
      
      {order.notifications.map((item) => (
        <Card className="p-5">
          <p>{item.message}</p>
        </Card>
      ))}
    </div>
  );
};

export default Notification;
