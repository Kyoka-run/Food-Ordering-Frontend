import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressFormModal from '../address/AddressFormModal';
import { createAddress } from '../../../redux/actions/addressActions';

const AddressSelection = ({ onSelectAddress }) => {
  const dispatch = useDispatch();
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const { user } = useSelector(state => state.auth);
  const jwt = localStorage.getItem("jwt");

  const initialAddressValues = {
    addressId: null,
    username: user?.username || '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Ireland'
  };

  const handleAddressSelect = (address) => {
    if (onSelectAddress) {
      onSelectAddress(address);
    }
  };

  const handleAddressSubmit = (addressData) => {
    dispatch(createAddress({ 
      addressData,
      jwt
    }));
    setIsAddAddressModalOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Delivery Address
        </h2>
        <p className="text-gray-600">
          Select a delivery address or add a new one
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user?.addresses?.map((address) => (
          <div 
            key={address.addressId}
            className="border rounded-lg p-4 hover:border-primary cursor-pointer"
            onClick={() => handleAddressSelect(address)}
          >
            <div className="flex items-start mb-2">
              <div className="flex-grow">
                <p className="font-semibold">{address.username}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>{address.street}</p>
              <p>{address.city}, {address.postalCode}</p>
              <p>{address.country}</p>
            </div>
          </div>
        ))}

        <div 
          className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-primary"
          onClick={() => setIsAddAddressModalOpen(true)}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">+</div>
            <p className="text-gray-600">Add New Address</p>
          </div>
        </div>
      </div>

      {isAddAddressModalOpen && (
        <AddressFormModal 
          initialValues={initialAddressValues}
          onClose={() => setIsAddAddressModalOpen(false)}
          onSubmit={handleAddressSubmit}
        />
      )}
    </div>
  );
};

export default AddressSelection;