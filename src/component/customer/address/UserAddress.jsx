import React from "react";
import { Button } from "@mui/material";
import AddressCard from "./AddressCard";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createAddress, updateAddress, deleteAddress } from "../../../redux/actions/addressActions";

const UserAddress = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const jwt = localStorage.getItem("jwt");
  
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddAddress = (values) => {
    dispatch(createAddress({ addressData: values, jwt }));
    setShowModal(false);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleUpdateAddress = (values) => {
    if (editingAddress) {
      dispatch(updateAddress({ 
        addressId: editingAddress.addressId, 
        addressData: values, 
        jwt 
      }));
    }
    setShowModal(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddress({ addressId, jwt }));
    }
  };

  const initialValues = editingAddress || {
    street: "",
    city: "",
    country: "",
    postalCode: ""
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center px-8 py-5">
        <h1 className="text-xl font-semibold">Addresses</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingAddress(null);
            setShowModal(true);
          }}
        >
          Add New Address
        </Button>
      </div>

      <div className="flex justify-center flex-wrap gap-6 px-8">
        {auth.user?.addresses.map((item) => (
          <AddressCard
            key={item.addressId}
            item={item}
            onEdit={() => handleEditAddress(item)}
            onDelete={() => handleDeleteAddress(item.addressId)}
          />
        ))}
      </div>

      {showModal && (
        <AddressFormModal
          initialValues={initialValues}
          onClose={() => {
            setShowModal(false);
            setEditingAddress(null);
          }}
          onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
          isEditing={!!editingAddress}
        />
      )}
    </div>
  );
};

export default UserAddress;