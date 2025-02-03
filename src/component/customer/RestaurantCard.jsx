import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { isPresentInFavorites } from "../../util/logic";
import { addToFavorites } from '../../redux/actions/authActions';

const RestaurantCard = ({ data, index }) => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addToFavorites({
      restaurantId: data.id,
      jwt: auth.jwt
    }));
  };

  const navigateToRestaurant = () => {
    if(data.open) {
      navigate(`/restaurant/${data.address.city}/${data.name}/${data.id}`);
    }
  };

  return (
    <Card className="m-5 w-[18rem] group">
      <div 
        onClick={navigateToRestaurant} 
        className={`${data.open ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={data.images[0]}
          alt={data.name}
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={data.open ? "success" : "error"}
          label={data.open ? "Open" : "Closed"}
        />
      </div>
      <div className="p-4 w-full transition-transform duration-300 ease-out group-hover:-translate-y-4 group-hover:bg-[#191919]">
        <div className="flex justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-lg">{data.name}</p>
            <p className="text-gray-500 text-sm">
              {data.description.length > 40
                ? data.description.substring(0, 40) + "..."
                : data.description}
            </p>
          </div>

          <div>
            <IconButton onClick={handleAddToFavorites}>
              {isPresentInFavorites(auth.favorites, data) ? (
                <FavoriteIcon color="primary" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;