import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/authActions';

const UserProfile = () => {
  const user = useSelector((store) => store.auth.user)  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout=()=>{
    dispatch(logout());
    navigate("/")
  }

  return (
    <div className='min-h-[70vh] flex flex-col justify-center items-center text-center'>
      <AccountCircleIcon sx={{fontSize:"9rem"}} />
      <h1 className='text-3xl font-semibold'>{user?.username}</h1>
      <h1 className='text-xl font-semibold'>Email : {user?.email}</h1>
      <Button onClick={handleLogout} variant='contained' sx={{margin:"2rem 0rem"}}>Logout</Button>
    </div>
  )
}

export default UserProfile