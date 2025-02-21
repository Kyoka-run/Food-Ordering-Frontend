import React, { useEffect } from "react";
import { Card } from "@mui/material";
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
      {order.notifications.map((item) => (
        <Card className="p-5">
          <p>{item.message}</p>
        </Card>
      ))}
    </div>
  );
};

export default Notification;
