import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const SuperAdminNavbar = ({ handleOpenSideBar }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-5 z-50 py-[.8rem] bg-[#ff6f00] flex justify-between">
      <div className="flex items-center space-x-4">
        <IconButton onClick={handleOpenSideBar}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center space-x-4"
        >
          <span className="logo font-semibold text-gray-100 text-2xl">
            Home
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminNavbar;