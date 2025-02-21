import { Chip, IconButton, Card } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../../redux/actions/cartActions";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleUpdateCartItem = (value) => {
    // Remove item if quantity would become 0
    if(value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
      return;
    }

    // Update quantity
    const data = { 
      cartItemId: item.cartItemId, 
      quantity: item.quantity + value 
    };
    dispatch(updateCartItem({data, jwt}));
  };
  
  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({cartItemId: item.cartItemId, jwt}));
  };

  return (
    <Card className="mb-4 mx-4">
      <div className="p-4">
        {/* Item Details Row */}
        <div className="flex items-center gap-4">
          {/* Food Image */}
          <img
            className="w-20 h-20 object-cover rounded-lg shadow-sm"
            src={item.foodImage}
            alt={item.foodName}
          />

          {/* Item Info and Controls */}
          <div className="flex-grow flex justify-between items-center">
            <div className="space-y-2">
              {/* Food Name */}
              <h3 className="font-medium text-lg">{item.foodName}</h3>

              {/* Quantity Controls */}
              <div className="flex items-center gap-1">
                <IconButton
                  onClick={() => handleUpdateCartItem(-1)}
                  color="primary"
                  size="small"
                  className="hover:bg-blue-50"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>

                <span className="w-8 h-8 flex items-center justify-center font-medium">
                  {item.quantity}
                </span>

                <IconButton
                  onClick={() => handleUpdateCartItem(1)}
                  color="primary"
                  size="small"
                  className="hover:bg-blue-50"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>

            {/* Price */}
            <span className="text-lg font-semibold px-4">
              €{item.totalPrice}
            </span>
          </div>
        </div>

        {/* Ingredients Chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {item.ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              size="small"
              className="bg-gray-100"
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;