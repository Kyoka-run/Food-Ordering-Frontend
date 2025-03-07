import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../../redux/actions/authActions";

const UserProfile = () => {
  const username = useSelector((state) => state.auth.user?.username);
  const email = useSelector((state) => state.auth.user?.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
    navigate("/");
  }

  return (
    <div className='min-h-[70vh] flex flex-col justify-center items-center text-center' data-testid="user-profile">
      <AccountCircleIcon sx={{fontSize:"9rem"}} data-testid="profile-icon" />
      <h1 className='text-3xl font-semibold' data-testid="username">{username}</h1>
      <h1 className='text-xl font-semibold' data-testid="email">Email: {email}</h1>
      <Button 
        onClick={handleLogout} 
        variant='contained' 
        sx={{margin:"2rem 0rem"}}
        data-testid="logout-button"
      >
        Logout
      </Button>
    </div>
  )
}

export default UserProfile