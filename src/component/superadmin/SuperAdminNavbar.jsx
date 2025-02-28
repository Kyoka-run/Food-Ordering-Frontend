import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

const menuItems = [
  { path: "", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "restaurants", label: "Restaurants", icon: <RestaurantIcon /> },
  { path: "customers", label: "Customers", icon: <PeopleIcon /> }
];

const SuperAdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get current path for active tab
  const currentPath = location.pathname.split("/super-admin/")[1] || "";
  const value = menuItems.some(item => item.path === currentPath) ? currentPath : "";

  const handleChange = (event, newPath) => {
    if (newPath === "logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/super-admin/${newPath}`);
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

export default SuperAdminNavbar;