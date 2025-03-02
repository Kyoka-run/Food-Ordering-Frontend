import React from 'react'
import RestaurantCard from './RestaurantCard'
import { useSelector } from 'react-redux'
import { 
  Box, 
  Typography,
} from '@mui/material';
import GlobalLoading from "../../GlobalLoading";

const Favorite = () => {
  const { auth } = useSelector((state) => state);

  return (
   <div>
    <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
    {/* Loading */}
    <GlobalLoading loading={auth.loading} />

    {/* Empty state */}
    {!auth.loading && auth.favorites.length === 0 && (
      <Box className="text-center py-8">
        <Typography variant="body1" color="text.secondary">
          You haven't add any favorites yet.
        </Typography>
      </Box>
    )}
    
    <div className='flex flex-wrap justify-center'>
      {auth.favorites?.map((item) => (
        <RestaurantCard key={item.restaurantId} data={item} />
      ))}
    </div>
   </div>
  )
}

export default Favorite