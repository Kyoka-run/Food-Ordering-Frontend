import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Auth from "../customer/Auth";
import { useDispatch, useSelector } from "react-redux";
import { pink } from "@mui/material/colors";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigateToProfile = (e) => {
    user?.roles?.includes("ROLE_RESTAURANT_OWNER")
      ? navigate("/admin/restaurant")
      : navigate("/my-profile");
  };

  const handleCloseAuthModal = () => {
    navigate("/");
  };

  useEffect(()=>{
    if(user?.username){
      navigate("/");
    }
  },[user])

  return (
    <div className="h-16 px-5 z-50 bg-[#e91e63] lg:px-20 flex justify-between items-center">
      {/* Logo section */}
      <div className="flex items-center space-x-4">
        <div
          onClick={() => navigate("/")}
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
          <span className="logo font-semibold text-gray-300 text-2xl text-center">
            Home
          </span>
        </div>
      </div>

      {/* Features section: search, user profile, cart */}
      <div className="flex items-center space-x-2 lg:space-x-10">
        {/* Search button */}
        <div className="">
          <IconButton onClick={() => navigate("/search")}>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>

        {/* User profile/login button */}
        <div className="flex items-center space-x-2">
          {user?.username ? (
            // Show avatar for logged-in users
            <span
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={
                user?.roles?.includes("ROLE_ADMIN")
                  ? () => navigate("/super-admin")
                  : navigateToProfile
              }
              className=" font-semibold cursor-pointer"
            >
              <Avatar sx={{ bgcolor: "white",color:pink.A400}} className="bg-white">
                {user.username[0].toUpperCase()}
              </Avatar>
            </span>
          ) : (
            // Show login icon for guests
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          )}
        </div>

        {/* Shopping cart button with item count */}
        <IconButton onClick={() => navigate("/cart")}>
          <Badge color="black" badgeContent={cartItems.length}>
            <ShoppingCartIcon className="text-4xl" sx={{ fontSize: "2rem" }} />
          </Badge>
        </IconButton>
      </div>

      <Auth handleClose={handleCloseAuthModal} />
    </div>
  );
};

export default Navbar;
