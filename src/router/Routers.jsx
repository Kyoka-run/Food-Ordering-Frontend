import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerRouter from "./CustomerRouter";
import AdminRouter from "./AdminRouter";

const Routers = () => {
  return (
    <>
    <Routes>
      <Route path="/admin/restaurant/*" element={<AdminRouter/>}/>
      <Route path="/*" element={<CustomerRouter/>} />
    </Routes>
    </>
  );
};

export default Routers;
