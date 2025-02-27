import React, { useState } from 'react';
import { Box, CircularProgress, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';
import { deleteAddress } from '../../../redux/actions/addressActions';

const UserAddress = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const jwt = localStorage.getItem('jwt');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Handle address deletion
  const handleDelete = (addressId) => {
    dispatch(deleteAddress({ addressId, jwt }));
  };

  // Open modal with pre-filled data for editing
  const handleEdit = (address) => {
    setEditingAddress({...address});
    setModalOpen(true);
  };

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-5 font-semibold">Addresses</h1>
      
      {/* Loading indicator */}
      {auth.loading && (
        <Box className="flex justify-center py-8">
          <CircularProgress />
        </Box>
      )}
      
      {/* Empty state */}
      {!auth.loading && auth?.user?.addresses?.length === 0 && (
        <Box className="text-center py-8">
          <Typography variant="body1" color="text.secondary">
            You haven't created any addresses yet.
          </Typography>
        </Box>
      )}
      
      <div className="flex justify-center flex-wrap gap-3">
        {auth.user?.addresses.map((item) => (
          <AddressCard 
            key={item.addressId}
            address={item} 
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.addressId)}
          />
        ))}

        <Button
          onClick={() => {
            setEditingAddress(null);
            setModalOpen(true);
          }}
          startIcon={<Add />}
          variant="contained"
        >
          Add Address
        </Button>
      </div>

      <AddressForm
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingAddress(null);
        }}
        initialValues={editingAddress}
        isEditing={!!editingAddress}
      />
    </div>
  );
};

export default UserAddress;