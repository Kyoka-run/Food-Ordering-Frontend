import { Chip, IconButton } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../redux/actions/cartActions";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(state => state)

  const handleUpdateCartItem = (value) => {
    if(value===-1 && item.quantity==1){
      handleRemoveCartItem()
    }

  const data={ cartItemId: item.cartItemId, quantity: item.quantity + value }
    dispatch(
      updateCartItem({data, jwt})
    );
  };
  
  const handleRemoveCartItem=()=>{
    dispatch(removeCartItem({cartItemId:item.cartItemId, jwt:auth.jwt || jwt}))
    
  }
  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={item.food.image}
            alt=""
          />
        </div>

        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full ">
            <p className="">{item.food.name}</p>
            {
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <IconButton
                    onClick={() => handleUpdateCartItem(-1)}
                    color="primary"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <div className="w-5 h-5 text-xs flex items-center justify-center ">
                    {item.quantity}
                  </div>

                  <IconButton
                    onClick={() => handleUpdateCartItem(1)}
                    color="primary"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div>
              </div>
            }
          </div>

          <p>€{item.totalPrice}</p>
        </div>
      </div>
      <div className="pt-3 space-x-2">
        {item.ingredients.map((item)=><Chip label={item}/> )}
      </div>
      
  </div>
  );
};

export default CartItemCard;
