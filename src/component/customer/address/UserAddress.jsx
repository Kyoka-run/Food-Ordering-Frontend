import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';
import GlobalLoading from "../../GlobalLoading";
import DeleteConfirmationDialog from "../../DeleteConfirmationDialog";
import { getUserAddresses, deleteAddress } from '../../../redux/actions/addressActions';

const UserAddress = () => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);
  const loading = useSelector(state => state.address.loading);
  const jwt = localStorage.getItem('jwt');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  // Handle delete button click (opens dialog)
  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
    setDeleteDialogOpen(true);
  };

  // Handle confirmed deletion
  const handleConfirmDelete = () => {
    if (addressToDelete) {
      dispatch(deleteAddress({ addressId: addressToDelete, jwt }));
    }
  };

  // Open modal with pre-filled data for editing
  const handleEdit = (address) => {
    setEditingAddress({...address});
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(getUserAddresses(jwt));
  }, [dispatch, jwt]);

  return (
    <div className="flex items-center flex-col" data-testid="user-addresses-container">
      <h1 className="text-xl text-center py-5 font-semibold" data-testid="page-title">Addresses</h1>
      
      {/* Loading */}
      <GlobalLoading loading={loading} />
      
      {/* Empty state */}
      {!loading && addresses.length === 0 && (
        <Box className="text-center py-8" data-testid="no-addresses-message">
          <Typography variant="body1" color="text.secondary">
            You haven't created any addresses yet.
          </Typography>
        </Box>
      )}
      
      <div className="flex justify-center flex-wrap gap-3" data-testid="addresses-list">
        {addresses.map((item) => (
          <AddressCard 
            key={item.addressId}
            address={item} 
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDeleteClick(item.addressId)}
            data-testid={`address-card-${item.addressId}`}
          />
        ))}

        <Button
          onClick={() => {
            setEditingAddress(null);
            setModalOpen(true);
          }}
          startIcon={<Add />}
          variant="contained"
          data-testid="add-address-button"
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Address"
        itemName={addresses.find(addr => addr.addressId === addressToDelete)?.street}
        contentText="This address will be permanently removed from your account. If it's used by any existing order, deletion may fail."
        data-testid="delete-dialog"
      />
    </div>
  );
};

export default UserAddress;