import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Box, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";

const menuItems = [
  { path: "", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "orders", label: "Orders", icon: <ShoppingBagIcon /> },
  { path: "menu", label: "Menu", icon: <RestaurantMenuIcon /> },
  { path: "category", label: "Food Category", icon: <CategoryIcon /> },
  { path: "ingredients", label: "Ingredients", icon: <FastfoodIcon /> },
  { path: "event", label: "Events", icon: <EventIcon /> },
  { path: "details", label: "Details", icon: <InfoIcon /> }
];

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get current path for active tab
  const currentPath = location.pathname.split("/admin/restaurant/")[1] || "";
  const value = menuItems.some(item => item.path === currentPath) ? currentPath : "";

  const handleChange = (event, newPath) => {
    if (newPath === "logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/admin/restaurant/${newPath}`);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      position: 'sticky',
      top: '64px', 
      backgroundColor: 'white',
      zIndex: 40,
      borderBottom: 1,
      borderColor: 'divider'
    }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          '& .MuiTab-root': {
            minHeight: '48px',
            textTransform: 'none'
          }
        }}
      >
        {menuItems.map((item) => (
          <Tab
            key={item.path}
            value={item.path}
            label={
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
            }
          />
        ))}
        <Tab
          value="logout"
          label={
            <div className="flex items-center space-x-2 text-red-500">
              <LogoutIcon />
              <span>Logout</span>
            </div>
          }
        />
      </Tabs>
    </Box>
  );
};

export default AdminNavbar;