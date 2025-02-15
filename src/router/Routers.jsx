import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerRouter from "./CustomerRouter";
import AdminRouter from "./AdminRouter";
import SuperAdmin from "./SuperAdminRouter";

const Routers = () => {
  return (
    <>
    <Routes>
      <Route path="/admin/restaurant/*" element={<AdminRouter/>}/>
      <Route path="/*" element={<CustomerRouter/>} />
      <Route path="/super-admin/*" element={<SuperAdmin/>} />
    </Routes>
    </>
  );
};

export default Routers;
