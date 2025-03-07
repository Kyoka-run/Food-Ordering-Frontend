import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Box, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";

const menuItems = [
  { path: "", label: "Dashboard", icon: <DashboardIcon />, testId: "dashboard-tab" },
  { path: "orders", label: "Orders", icon: <ShoppingBagIcon />, testId: "orders-tab" },
  { path: "menu", label: "Menu", icon: <RestaurantMenuIcon />, testId: "menu-tab" },
  { path: "category", label: "Food Category", icon: <CategoryIcon />, testId: "category-tab" },
  { path: "ingredients", label: "Ingredients", icon: <FastfoodIcon />, testId: "ingredients-tab" },
  { path: "event", label: "Events", icon: <EventIcon />, testId: "events-tab" },
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
      dispatch(logoutUser(navigate));
      navigate("/");
    } else {
      navigate(`/admin/restaurant/${newPath}`);
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        position: 'sticky',
        top: '64px', 
        backgroundColor: 'white',
        zIndex: 40,
        borderBottom: 1,
        borderColor: 'divider'
      }}
      data-testid="admin-navbar"
    >
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
        data-testid="admin-tabs"
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
            data-testid={item.testId}
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
          data-testid="logout-tab"
        />
      </Tabs>
    </Box>
  );
};

export default AdminNavbar;