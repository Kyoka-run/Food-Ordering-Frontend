import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Dashboard } from "@mui/icons-material";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { logout } from "../../redux/actions/authActions";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBagIcon />, path: "/orders" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
  { title: "Events", icon: <EventIcon />, path: "/event" },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export default function AdminSidebar({ handleClose, open }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    navigate(`/admin/restaurant${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
    } else if (item.title === "Restaurants") {
      navigate("/admin");
    }
    handleClose()
  };

  return (
    <div className=" ">
      <React.Fragment>
        <Drawer
          sx={{ zIndex: 1 }}
          anchor={"left"}
          open={open}
          onClose={handleClose}
        >
          {/* Main navigation menu container */}
          <div className="w-[70vw] lg:w-[30vw] group h-[100vh] flex flex-col justify-center text-xl space-y-[1.65rem]">
            {menu.map((item, i) => (
              <div key={item.title}>
                <div
                  onClick={() => handleNavigate(item)}
                  className="px-5 flex items-center space-x-5 cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              {/* Add divider between menu items except for the last one */}
              {i!==menu.length-1 && <Divider />}
              </div>
            ))}
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
