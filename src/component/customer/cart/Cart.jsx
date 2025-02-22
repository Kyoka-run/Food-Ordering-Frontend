import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveShoppingCart } from '@mui/icons-material';
import CartItemCard from './CartItemCard';
import AddressSelection from '../checkout/AddressSelection';
import { createOrder } from '../../../redux/actions/orderActions';
import { findCart } from '../../../redux/actions/cartActions';
import { cartTotal } from '../../../util/TotalPay';
import { isValid } from '../../../util/ValidToOrder';

const Cart = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { cart } = useSelector((store) => store);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderError, setOrderError] = useState(null);

  // Fetch cart data on component mount
  useEffect(() => {
    dispatch(findCart(jwt));
  }, [dispatch, jwt]);

  // Handle placing the order
  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      setOrderError("Please select a delivery address");
      return;
    }

    if (!isValid(cart.cartItems)) {
      setOrderError("Please add items only from one restaurant");
      return;
    }

    const orderData = {
      restaurantId: cart.cartItems[0]?.food?.restaurant.id,
      items: cart.cartItems.map(item => ({
        foodId: item.foodId,
        quantity: item.quantity,
        ingredients: item.ingredients
      })),
      addressId: selectedAddress.addressId
    };

    dispatch(createOrder({ order: orderData, jwt }));
  };

  // Empty cart view
  if (cart.cartItems.length === 0) {
    return (
      <div className="flex h-[90vh] justify-center items-center">
        <div className="text-center space-y-5">
          <RemoveShoppingCart className="w-40 h-40" />
          <p className="font-bold text-3xl">Your Cart Is Empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
          <div className="space-y-4">
            {cart.cartItems.map((item) => (
              <CartItemCard key={item.cartItemId} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>€{cartTotal(cart.cartItems)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>€2</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>€1</span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant Charges</span>
                <span>€2</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>€{cartTotal(cart.cartItems) + 5}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Selection Section */}
        <div className="lg:w-1/3">
          <AddressSelection 
            onAddressSelect={setSelectedAddress}
            selectedAddress={selectedAddress}
          />

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedAddress}
            className="w-full mt-6 py-3 px-4 bg-primary text-white rounded-lg 
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     hover:bg-primary-dark transition-colors"
          >
            Place Order
          </button>

          {orderError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {orderError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;