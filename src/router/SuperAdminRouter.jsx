import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminSidebar from "../component/superadmin/SuperAdminSideBar";
import Customers from "../component/superadmin/Customers";
import SuperAdminRestaurant from "../component/superadmin/SuperAdminRestaurant";
import RestaurantRequest from "../component/superadmin/RestaurantRequest";
import SuperAdminDashboard from "../component/superadmin/SuperAdminDashboard";

const SuperAdminRouter = () => {
  return (
    <div className="lg:flex justify-between">
      <div>
        <SuperAdminSidebar />
      </div>

      <div className="w-[80vw]">
        <Routes>
          <Route path="/" element={<SuperAdminDashboard/>}></Route>
          <Route path="/customers" element={<Customers/>}></Route>
          <Route path="/restaurants" element={<SuperAdminRestaurant/>}></Route>
          <Route path="/restaurant-request" element={<RestaurantRequest/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdminRouter;
