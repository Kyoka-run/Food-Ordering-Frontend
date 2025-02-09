import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfileNavbar from "../shared/ProfileNavbar";
import Orders from "./Order";
import UsersAddresses from "./UserAddress";
import Favorite from "./Favorite";
import UserProfile from "./UserProfile";
import CustomerEvents from "./CustomerEvents";
import Notifications from "./Notification";

const Profile = () => {
  return (
    <div className="min-h-screen">
      <ProfileNavbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<UsersAddresses />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/payments" element={<Orders />} />
          <Route path="/events" element={<CustomerEvents />} />
          <Route path="/notification" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;