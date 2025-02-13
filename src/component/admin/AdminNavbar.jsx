import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";

const AdminNavbar = ({handleOpenSideBar}) => {

  return (
    <div className="px-5 z-50 py-[.8rem] bg-[#e91e63]  lg:px-20 flex justify-between">
      <div className="flex items-center space-x-4">
        <div
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
          <IconButton onClick={handleOpenSideBar}><MenuIcon/></IconButton>
          <span className="logo font-semibold text-gray-300 text-2xl">
            Home
          </span>
        </div>
        {/* <li className="font font-semibold">Home</li> */}
      </div>
      

    </div>
  );
};

export default AdminNavbar;
