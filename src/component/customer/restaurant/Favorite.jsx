import React from 'react'
import RestaurantCard from './RestaurantCard'
import { useSelector } from 'react-redux'
import { 
  Box, 
  Typography,
} from '@mui/material';
import GlobalLoading from "../../GlobalLoading";

const Favorite = () => {
  const loading = useSelector((state) => state.auth.loading);
  const favorites = useSelector((state) => state.auth.favorites);
  
  return (
   <div>
    <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
    {/* Loading */}
    <GlobalLoading loading={loading} />

    {/* Empty state */}
    {!loading && favorites.length === 0 && (
      <Box className="text-center py-8">
        <Typography variant="body1" color="text.secondary">
          You haven't add any favorites yet.
        </Typography>
      </Box>
    )}
    
    <div className='flex flex-wrap justify-center'>
      {favorites?.map((item) => (
        <RestaurantCard key={item.restaurantId} data={item} />
      ))}
    </div>
   </div>
  )
}

export default Favorite