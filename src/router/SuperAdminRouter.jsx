import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminNavbar from "../component/superadmin/SuperAdminNavbar";
import Customers from "../component/superadmin/Customers";
import SuperAdminRestaurant from "../component/superadmin/SuperAdminRestaurant";
import SuperAdminDashboard from "../component/superadmin/SuperAdminDashboard";
import Navbar from "../component/Navbar";

const SuperAdminRouter = () => {

  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <SuperAdminNavbar/>
      <div className="lg:px-5 lg:py-5 justify-center">
        <Routes>
          <Route path="/" element={<SuperAdminDashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/restaurants" element={<SuperAdminRestaurant />} />
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdminRouter;