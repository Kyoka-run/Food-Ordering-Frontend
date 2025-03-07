import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { isPresentInFavorites } from "../../../util/logic";
import { addToFavorites } from '../../../redux/actions/authActions';

const RestaurantCard = ({ data }) => {
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.auth.jwt);
  const favorites = useSelector((state) => state.auth.favorites);
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    if (!jwt) {
      navigate("/account/login");
      return
    }
    
    dispatch(addToFavorites({
      restaurantId: data.restaurantId,
      jwt: jwt
    }));
  };

  const navigateToRestaurant = () => {
    if(data.open) {
      navigate(`/restaurant/${data.restaurantId}`);
    }
  };

  return (
    <Card className="m-5 w-[18rem] group" data-testid={`restaurant-card-${data.restaurantId}`}>
      <div 
        onClick={navigateToRestaurant} 
        className={`${data.open ? "cursor-pointer" : "cursor-not-allowed"} relative`}
        data-testid="restaurant-card-clickable"
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={data.images[0]}
          alt={data.name}
          data-testid="restaurant-image"
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={data.open ? "success" : "error"}
          label={data.open ? "Open" : "Closed"}
          data-testid="restaurant-status"
        />
      </div>
      <div className="p-4 w-full transition-transform duration-300 ease-out group-hover:-translate-y-4 group-hover:bg-[#eeeeee]">
        <div className="flex justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-lg" data-testid="restaurant-name">{data.name}</p>
            <p className="text-gray-500 text-sm" data-testid="restaurant-description">
              {data.description.length > 40
                ? data.description.substring(0, 40) + "..."
                : data.description}
            </p>
          </div>

          <div>
            <IconButton 
              onClick={handleAddToFavorites}
              data-testid="favorite-button"
            >
              {isPresentInFavorites(favorites, data) ? (
                <FavoriteIcon color="primary" data-testid="favorite-icon-filled" />
              ) : (
                <FavoriteBorderIcon data-testid="favorite-icon-outline" />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;