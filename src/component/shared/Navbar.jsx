import React from 'react'
import {
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 z-50 py-3 bg-primary-main lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <span className="logo font-Arial text-white text-2xl">
            Kyoka Food
        </span>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <IconButton onClick={() => navigate("/search")}>
          <SearchIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>

        <IconButton onClick={() => navigate("/account/login")}>
          <PersonIcon sx={{ fontSize: "2rem" }} />
        </IconButton>

        <IconButton onClick={() => navigate("/cart")}>
          <ShoppingCartIcon className="text-4xl" sx={{ fontSize: "2rem" }} />
        </IconButton>
      </div>
    </div>
  )
}

export default Navbar
