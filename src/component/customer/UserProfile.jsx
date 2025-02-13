import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const UserProfile = () => {
  const user = useSelector((store) => store.auth.user)  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout=()=>{
    dispatch(logout());
    navigate("/")
  }

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center '>
        <div className='flex flex-col items-center justify-center'>
            <AccountCircleIcon sx={{fontSize:"9rem"}} />
            <h1 className='py-5 text-2xl font-semibold'>{user?.username}</h1>
            <p>Email : {user?.email}</p>
            <Button onClick={handleLogout} variant='contained' sx={{margin:"2rem 0rem"}}>Logout</Button>
        </div>
    </div>
  )
}

export default UserProfile