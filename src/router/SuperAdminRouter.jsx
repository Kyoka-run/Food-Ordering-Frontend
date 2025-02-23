import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminSidebar from "../component/superadmin/SuperAdminSideBar";
import SuperAdminNavbar from "../component/superadmin/SuperAdminNavbar";
import Customers from "../component/superadmin/Customers";
import SuperAdminRestaurant from "../component/superadmin/SuperAdminRestaurant";
import SuperAdminDashboard from "../component/superadmin/SuperAdminDashboard";

const SuperAdminRouter = () => {
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);

  return (
    <div>
      <SuperAdminNavbar handleOpenSideBar={handleOpenSideBar} />
      <div className="lg:px-5 lg:py-5 justify-center">
        <div>
          <SuperAdminSidebar 
            open={openSideBar} 
            handleClose={handleCloseSideBar} 
          />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<SuperAdminDashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/restaurants" element={<SuperAdminRestaurant />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminRouter;