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
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../redux/actions/cartActions';
import { categorizedIngredients } from '../../../util/CategorizeIngredients';

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
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
    <Card className="mb-4 overflow-hidden">
      <Accordion>
        {/* Card Header with Item Details */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="hover:bg-gray-50"
        >
          <div className="flex items-center w-full gap-4">
            {/* Food Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            
            {/* Item Details */}
            <div className="flex-grow">
              <Typography variant="h6" className="font-medium">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mt-1">
                {item.description}
              </Typography>
              <div className="flex items-center gap-2 mt-2">
                <Typography variant="h6" color="primary">
                  €{item.price}
                </Typography>
                <Chip 
                  size="small"
                  color={item.available ? "success" : "error"}
                  label={item.available ? "Available" : "Out of Stock"}
                />
              </div>
            </div>
          </div>
        </AccordionSummary>

        {/* Ingredients Selection */}
        <AccordionDetails className="bg-gray-50">
          <form onSubmit={handleAddItemToCart}>
            <Typography variant="subtitle1" className="mb-3">
              Customize Your Order
            </Typography>
            
            {/* Ingredients Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categorizedIngredients(item?.ingredients))
                .map(([category, ingredients]) => (
                <div key={category} className="bg-white p-4 rounded-lg">
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