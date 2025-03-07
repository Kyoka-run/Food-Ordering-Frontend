import { Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";

const SearchDishCard = ({ item }) => {
  const navigate = useNavigate();

  // Navigate to restaurant page
  const handleNavigateToRestaurant = () => {
    navigate(`/restaurant/${item.restaurantId}`);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-300 mb-4"
      data-testid={`dish-card-${item.foodId}`}
    >
      <CardContent className="p-4">
        {/* Restaurant Header */}
        <div className="flex justify-between items-center mb-4">
          <Typography 
            variant="h6" 
            className="font-medium"
            data-testid={`restaurant-name-${item.foodId}`}
          >
            {item.restaurantName}
          </Typography>
          <IconButton 
            onClick={handleNavigateToRestaurant}
            className="hover:bg-gray-100"
            data-testid={`navigate-button-${item.foodId}`}
          >
            <EastIcon />
          </IconButton>
        </div>

        {/* Item Details */}
        <div className="flex justify-between items-center">
          <div className="flex-grow">
            <Typography 
              variant="subtitle1" 
              className="font-medium"
              data-testid={`dish-name-${item.foodId}`}
            >
              {item.name}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              className="line-clamp-2 mt-1"
              data-testid={`dish-description-${item.foodId}`}
            >
              {item.description}
            </Typography>
            <Typography 
              variant="h6" 
              color="primary"
              className="mt-2"
              data-testid={`dish-price-${item.foodId}`}
            >
              €{item.price}
            </Typography>
          </div>

          {/* Image */}
          <div className="flex flex-col items-center ml-4 gap-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
              data-testid={`dish-image-${item.foodId}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchDishCard;