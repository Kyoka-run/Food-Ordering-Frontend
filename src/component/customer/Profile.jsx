import React from "react";
import ProfileNavigation from "../shared/ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import Orders from "./Order";
import UsersAddresses from "./UserAddress";
import Favorite from "./Favorite";
import UserProfile from "./UserProfile";
import CustomerEvents from "./CustomerEvents";
import Notification from "./Notification";

const Profile = () => {
  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
        <Route path="/" element={<UserProfile/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/address" element={<UsersAddresses/>} />
          <Route path="/favorites" element={<Favorite/>} />
          <Route path="/payments" element={<Orders/>} />
          <Route path="/events" element={<CustomerEvents/>} />
          <Route path="/notification" element={<Notification/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
