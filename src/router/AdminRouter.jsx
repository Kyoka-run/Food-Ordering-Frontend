import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../component/admin/Admin";
import { useSelector } from "react-redux";
import CreateRestaurantForm from "../component/admin/CreateRestaurantForm";

const AdminRouter = () => {
  const { auth, restaurant } = useSelector((store) => store);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !restaurant.usersRestaurant ? (
              <CreateRestaurantForm />
            ) : (
              <Admin />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRouter;
