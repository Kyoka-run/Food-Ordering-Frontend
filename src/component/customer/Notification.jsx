import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotification } from "../../redux/actions/orderActions";
import { Card } from "@mui/material";

const Notification = () => {
  const dispatch = useDispatch();

  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserNotification());
  }, []);

  return (
    <div className="space-y-5 px-5 lg:px-20">
      <h1 className="py-5 font-bold text-2xl text-center">Notifications</h1>
      {order.notifications.map((item) => (
        <Card className="p-5">
          <p>{item.message}</p>
        </Card>
      ))}
    </div>
  );
};

export default Notification;
