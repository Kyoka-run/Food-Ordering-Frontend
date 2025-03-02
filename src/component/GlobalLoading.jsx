import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const GlobalLoading = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <Backdrop
      sx={{ 
        color: "#fff", 
        zIndex: 5 
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalLoading;