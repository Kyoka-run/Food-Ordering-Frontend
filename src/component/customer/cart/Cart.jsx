import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveShoppingCart } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import CartItemCard from './CartItemCard';
import AddressCard from '../address/AddressCard';
import AddressFormModal from '../address/AddressFormModal';
import { createOrder } from '../../../redux/actions/orderActions';
import { findCart } from '../../../redux/actions/cartActions';
import { deleteAddress } from '../../../redux/actions/addressActions';
import { cartTotal } from '../../../util/TotalPay';
import { isValid } from '../../../util/ValidToOrder';

const Cart = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { cart, auth } = useSelector((store) => store);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [orderError, setOrderError] = useState(null);

  // Fetch cart data when component mounts
  useEffect(() => {
    dispatch(findCart(jwt));
  }, [dispatch, jwt]);

  // Handle address selection by clicking the card
  const handleAddressSelect = (address) => {
    setSelectedAddressId(address.addressId);
  };

  // Handle address editing
  const handleEdit = (address) => {
    setEditingAddress({...address});
    setModalOpen(true);
  };

  // Handle address deletion
  const handleDelete = (addressId) => {
    if (addressId === selectedAddressId) {
      setSelectedAddressId(null);
    }
    dispatch(deleteAddress({ addressId, jwt }));
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
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
      addressId: selectedAddressId
    };

    dispatch(createOrder({ order: orderData, jwt }));
  };

  // Show empty cart message if no items
  if (cart.cartItems.length === 0) {
    return (
      <div className="flex h-[90vh] justify-center items-center">
        <div className="text-center space-y-5">
          <RemoveShoppingCart className="w-40 h-40" />
          <Typography variant="h4">Your Cart Is Empty</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="lg:w-2/3">
          <Typography variant="h5" className="mb-6">Shopping Cart</Typography>
          <div className="space-y-4">
            {cart.cartItems.map((item) => (
              <CartItemCard key={item.cartItemId} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <Typography variant="h6" className="mb-4">Order Summary</Typography>
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
              <Divider />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>€{cartTotal(cart.cartItems) + 5}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Address Selection Section */}
        <div className="lg:w-1/3">
          <Typography variant="h6" className="mb-4">Delivery Address</Typography>
          <p className="text-gray-600">Select a delivery address or add a new one</p>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {auth?.user?.addresses?.map((item) => (
              <AddressCard
                key={item.addressId}
                address={item}
                selected={item.addressId === selectedAddressId}
                onSelect={handleAddressSelect}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.addressId)}
              />
            ))}
            
            {/* Add New Address Card */}
            <div 
              className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-primary"
              onClick={() => {
                setEditingAddress(null);
                setModalOpen(true);
              }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">+</div>
                <p className="text-gray-600">Add New Address</p>
              </div>
            </div>
          </div>

          {/* Address Form Modal */}
          <AddressFormModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEditingAddress(null);
            }}
            initialValues={editingAddress || {
              street: '',
              city: '',
              state: '',
              postalCode: '',
              country: 'Ireland'
            }}
            isEditing={!!editingAddress}
          />

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedAddressId}
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