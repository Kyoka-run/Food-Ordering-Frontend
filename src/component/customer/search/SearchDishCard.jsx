import { Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../../redux/actions/cartActions";

const SearchDishCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  // Navigate to restaurant page
  const handleNavigateToRestaurant = () => {
    navigate(`/restaurant/${item.restaurantId}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        {/* Restaurant Header */}
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" className="font-medium">
            {item.restaurantName}
          </Typography>
          <IconButton 
            onClick={handleNavigateToRestaurant}
            className="hover:bg-gray-100"
          >
            <EastIcon />
          </IconButton>
        </div>

        {/* Item Details */}
        <div className="flex justify-between items-center">
          <div className="flex-grow">
            <Typography variant="subtitle1" className="font-medium">
              {item.name}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              className="line-clamp-2 mt-1"
            >
              {item.description}
            </Typography>
            <Typography 
              variant="h6" 
              color="primary"
              className="mt-2"
            >
              €{item.price}
            </Typography>
          </div>

          {/* Image and Add Button */}
          <div className="flex flex-col items-center ml-4 gap-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchDishCard;