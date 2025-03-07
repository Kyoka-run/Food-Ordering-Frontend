import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

describe('DeleteConfirmationDialog', () => {
  // Mock handlers
  const onCloseMock = vi.fn();
  const onConfirmMock = vi.fn();
  
  // Reset mocks before each test
  beforeEach(() => {
    onCloseMock.mockReset();
    onConfirmMock.mockReset();
  });

  it('should not render when closed', () => {
    render(
      <DeleteConfirmationDialog
        open={false}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    
    expect(screen.queryByTestId('delete-confirmation-dialog')).not.toBeInTheDocument();
  });

  it('should render with default props when open', () => {
    render(
      <DeleteConfirmationDialog
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    
    expect(screen.getByTestId('delete-confirmation-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Confirm Delete');
    expect(screen.getByTestId('dialog-message')).toContainHTML('Are you sure you want to delete');
    expect(screen.getByTestId('dialog-warning')).toHaveTextContent('This action cannot be undone.');
    expect(screen.getByTestId('cancel-button')).toHaveTextContent('Cancel');
    expect(screen.getByTestId('confirm-button')).toHaveTextContent('Delete');
  });

  it('should render with custom props', () => {
    const customTitle = "Delete User";
    const customItemName = "John Doe";
    const customConfirmText = "Yes, Delete";
    const customCancelText = "No, Keep";
    const customContentText = "This will permanently delete the user.";
    
    render(
      <DeleteConfirmationDialog
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        title={customTitle}
        itemName={customItemName}
        confirmButtonText={customConfirmText}
        cancelButtonText={customCancelText}
        contentText={customContentText}
      />
    );
    
    expect(screen.getByTestId('dialog-title')).toHaveTextContent(customTitle);
    expect(screen.getByTestId('item-name')).toHaveTextContent(`"${customItemName}"`);
    expect(screen.getByTestId('dialog-warning')).toHaveTextContent(customContentText);
    expect(screen.getByTestId('cancel-button')).toHaveTextContent(customCancelText);
    expect(screen.getByTestId('confirm-button')).toHaveTextContent(customConfirmText);
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <DeleteConfirmationDialog
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    
    fireEvent.click(screen.getByTestId('close-button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when cancel button is clicked', () => {
    render(
      <DeleteConfirmationDialog
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm and onClose when confirm button is clicked', () => {
    render(
      <DeleteConfirmationDialog
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );
    
    fireEvent.click(screen.getByTestId('confirm-button'));
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should not display item name if not provided', () => {
    render(
      <DeleteConfirmationDialog
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        itemName={undefined}
      />
    );
    
    expect(screen.getByTestId('dialog-message')).toHaveTextContent('Are you sure you want to delete this item?');
    expect(screen.queryByTestId('item-name')).not.toBeInTheDocument();
  });
});