import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  IconButton,
  Button
} from "@mui/material";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./customer/auth/Auth";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigateToProfile = () => {
    navigate("/my-profile");
  };

  // Check user roles
  const isAdmin = user?.roles?.includes("ROLE_RESTAURANT_OWNER");
  const isSuperAdmin = user?.roles?.includes("ROLE_ADMIN");

  return (
    <div className="h-16 px-5 z-50 bg-[#ff6f00] flex justify-between items-center">
      {/* Logo section */}
      <div className="flex items-center space-x-4">
        <div
          onClick={() => navigate("/")}
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
          <span className="logo font-semibold text-gray-100 text-2xl text-center">
            Home
          </span>
        </div>
      </div>

      {/* Features section: search, user profile, cart */}
      <div className="flex items-center space-x-1 lg:space-x-7">
        {/* Search button */}
        <div className="">
          <IconButton onClick={() => navigate("/search")}>
            <SearchIcon sx={{ fontSize: "1.5rem", color: "white" }} />
          </IconButton>
        </div>

        {/* Admin button */}
        {(isAdmin || isSuperAdmin) && (
          <Button
            className="text-white hover:text-gray-300"
            onClick={() => navigate("/admin/restaurant")}
          >
            My Restaurant
          </Button>
        )}

        {/* SuperAdmin button */}
        {isSuperAdmin && (
          <Button
            className="text-white hover:text-gray-300"
            onClick={() => navigate("/super-admin")}
          >
            Admin
          </Button>
        )}
        
        {/* User profile/login button */}
        <div className="flex items-center space-x-2">
          {user?.username ? (
            // Show avatar for logged-in users
            <span
              onClick={navigateToProfile}
              className="font-semibold cursor-pointer"
            >
              <Avatar sx={{ bgcolor: "white", color: pink.A400 }} className="bg-white">
                {user.username[0].toUpperCase()}
              </Avatar>
            </span>
          ) : (
            // Show login icon for guests
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ fontSize: "2rem", color: "white" }} />
            </IconButton>
          )}
        </div>

        {/* Shopping cart button with item count */}
        <IconButton onClick={() => navigate("/cart")}>
          <Badge color="error" badgeContent={cartItems.length}>
            <ShoppingCartIcon sx={{ fontSize: "2rem", color: "white" }} />
          </Badge>
        </IconButton>
      </div>

      <Auth handleClose={() => navigate("/")} />
    </div>
  );
};

export default Navbar;