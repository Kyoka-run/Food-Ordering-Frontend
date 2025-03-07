import React from 'react';
import { Card, IconButton, Typography } from '@mui/material';
import { Edit, Delete, Home } from '@mui/icons-material';

const AddressCard = ({ 
  address, 
  onEdit, 
  onDelete, 
  onSelect = null, // Optional selection handler for Cart view
  selected = false, // Selection state for Cart view
  showActions = true // Controls visibility of edit/delete buttons
}) => {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(address);
    }
  };

  return (
    <Card 
      data-testid={`address-card-${address.addressId}`}
      className={`p-4 transition-all duration-200 ${
        selected 
          ? 'border-2 border-blue-500 shadow-lg bg-blue-50' 
          : 'border border-gray-200'
      } ${
        onSelect 
          ? 'cursor-pointer hover:border-blue-300 hover:shadow-md' 
          : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-start gap-3">
        <Home color="primary" />
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <Typography 
              variant="subtitle1" 
              className="font-medium"
              data-testid={`address-street-${address.addressId}`}
            >
              {address.street}
            </Typography>
            {showActions && (
              <div className="flex gap-1">
                <IconButton 
                  size="small" 
                  data-testid={`edit-address-${address.addressId}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(address);
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  data-testid={`delete-address-${address.addressId}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(address.addressId);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            )}
          </div>
          <Typography 
            color="text.secondary" 
            variant="body2"
            data-testid={`address-city-${address.addressId}`}
          >
            {address.city}, {address.postalCode}
          </Typography>
          <Typography 
            color="text.secondary" 
            variant="body2"
            data-testid={`address-country-${address.addressId}`}
          >
            {address.country}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default AddressCard;