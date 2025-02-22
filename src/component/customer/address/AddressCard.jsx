import React from 'react';
import { Button, Card, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const AddressCard = ({ 
  item, 
  handleSelectAddress = null, 
  showButton = false,
  onEdit,
  onDelete 
}) => {
  return (
    <Card className="flex space-x-5 w-64 p-5">
      <HomeIcon />
      <div className="space-y-3 text-gray-500">
        <div className="flex justify-between items-start">
          <h1 className="font-semibold text-lg text-white">Home</h1>
          <div className="flex space-x-2">
            {onEdit && (
              <IconButton size="small" onClick={onEdit}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton size="small" onClick={onDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>
        
        <div className="space-y-1">
          <p>{item.street}</p>
          <p>{item.city}</p>
          <p>{item.country}, {item.postalCode}</p>
        </div>

        {showButton && (
          <Button
            onClick={() => handleSelectAddress(item)}
            variant="outlined"
            className="w-full mt-3"
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;