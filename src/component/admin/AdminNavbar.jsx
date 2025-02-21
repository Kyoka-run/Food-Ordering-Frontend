import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({handleOpenSideBar}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-5 z-50 py-[.8rem] bg-[#ff6f00] flex justify-between">
      <div className="flex items-center space-x-4">
      <IconButton onClick={handleOpenSideBar}><MenuIcon/></IconButton>
        <div
          onClick={() => navigate("/")}
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
          <span className="logo font-semibold text-gray-100 text-2xl">
            Home
          </span>
        </div>
        {/* <li className="font font-semibold">Home</li> */}
      </div>
      

    </div>
  );
};

export default AdminNavbar;
