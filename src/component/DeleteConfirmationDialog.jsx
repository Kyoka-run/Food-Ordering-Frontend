import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  IconButton
} from '@mui/material';
import { Warning, Close } from '@mui/icons-material';

const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  itemName,
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  contentText = "This action cannot be undone."
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      maxWidth="sm"
      fullWidth
      data-testid="delete-confirmation-dialog"
    >
      <DialogTitle id="delete-dialog-title" className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Warning color="error" />
          <Typography variant="h6" data-testid="dialog-title">{title}</Typography>
        </div>
        <IconButton onClick={onClose} size="small" data-testid="close-button">
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1" id="delete-dialog-description" className="mb-2" data-testid="dialog-message">
          Are you sure you want to delete {itemName ? <strong data-testid="item-name">"{itemName}"</strong> : "this item"}?
        </Typography>
        <Typography variant="body2" color="text.secondary" data-testid="dialog-warning">
          {contentText}
        </Typography>
      </DialogContent>
      
      <DialogActions className="p-3">
        <Button 
          onClick={onClose} 
          color="primary" 
          variant="outlined"
          data-testid="cancel-button"
        >
          {cancelButtonText}
        </Button>
        <Button 
          onClick={handleConfirm} 
          color="error" 
          variant="contained" 
          autoFocus
          data-testid="confirm-button"
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;