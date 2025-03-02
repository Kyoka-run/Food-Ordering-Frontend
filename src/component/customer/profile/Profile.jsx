import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar";
import Orders from "../order/Order";
import UsersAddresses from "../address/UserAddress";
import Favorite from "../restaurant/Favorite";
import UserProfile from "../profile/UserProfile";
import CustomerEvents from "../event/CustomerEvents";

const Profile = () => {
  return (
    <>
      <ProfileNavbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<UsersAddresses />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/events" element={<CustomerEvents />} />
        </Routes>
      </div>
    </>
  );
};

export default Profile;