import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Chip
} from '@mui/material';
import { useNavigate } from'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../../redux/actions/cartActions';
import { categorizedIngredients } from '../../../util/CategorizeIngredients';

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = useSelector(state => state.auth.jwt);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Handle ingredient selection/deselection
  const handleCheckboxChange = (itemName) => {
    setSelectedIngredients(prev => 
      prev.includes(itemName)
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  // Handle adding item to cart
  const handleAddItemToCart = (e) => {
    if (!jwt) {
      navigate("/account/login");
      return;
    }
    e.preventDefault();
    dispatch(addItemToCart({
      token: jwt,
      cartItem: {
        foodId: item.foodId,
        quantity: 1,
        ingredients: selectedIngredients
      }
    }));
  };

  return (
    <Card className="mb-4 overflow-hidden" data-testid={`menu-item-${item.foodId}`}>
      <Accordion>
        {/* Card Header with Item Details */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="hover:bg-gray-50"
          data-testid={`menu-item-summary-${item.foodId}`}
        >
          <div className="flex items-center w-full gap-4">
            {/* Food Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
              data-testid={`menu-item-image-${item.foodId}`}
            />
            
            {/* Item Details */}
            <div className="flex-grow">
              <Typography 
                variant="h6" 
                className="font-medium"
                data-testid={`menu-item-name-${item.foodId}`}
              >
                {item.name}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                className="mt-1"
                data-testid={`menu-item-description-${item.foodId}`}
              >
                {item.description}
              </Typography>
              <div className="flex items-center gap-2 mt-2">
                <Typography 
                  variant="h6" 
                  color="primary"
                  data-testid={`menu-item-price-${item.foodId}`}
                >
                  €{item.price}
                </Typography>
                <Chip 
                  size="small"
                  color={item.available ? "success" : "error"}
                  label={item.available ? "Available" : "Out of Stock"}
                  data-testid={`menu-item-availability-${item.foodId}`}
                />
              </div>
            </div>
          </div>
        </AccordionSummary>

        {/* Ingredients Selection */}
        <AccordionDetails className="bg-gray-50" data-testid={`menu-item-details-${item.foodId}`}>
          <form onSubmit={handleAddItemToCart}>
            <Typography variant="subtitle1" className="mb-3">
              Customize Your Order
            </Typography>
            
            {/* Ingredients Categories */}
            <div className="Grid Grid-cols-1 md:Grid-cols-2 lg:Grid-cols-3 gap-4">
              {Object.entries(categorizedIngredients(item?.ingredients || []))
                .map(([category, ingredients]) => (
                <div 
                  key={category} 
                  className="bg-white p-4 rounded-lg"
                  data-testid={`ingredient-category-${category}`}
                >
                  <Typography variant="subtitle2" className="mb-2">
                    {category}
                  </Typography>
                  <FormGroup>
                    {ingredients.map((ingredient) => (
                      <FormControlLabel
                        key={ingredient.name}
                        control={
                          <Checkbox
                            checked={selectedIngredients.includes(ingredient.name)}
                            onChange={() => handleCheckboxChange(ingredient.name)}
                            disabled={!ingredient.inStock}
                            size="small"
                            data-testid={`ingredient-checkbox-${ingredient.name}`}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            {ingredient.name}
                            {!ingredient.inStock && 
                              <span className="text-red-500 text-xs ml-2">
                                (Out of stock)
                              </span>
                            }
                          </Typography>
                        }
                      />
                    ))}
                  </FormGroup>
                </div>
              ))}
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              type="submit"
              disabled={!item.available}
              className="mt-4"
              fullWidth
              data-testid={`add-to-cart-button-${item.foodId}`}
            >
              {item.available ? "Add to Cart" : "Out of Stock"}
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default MenuItemCard;