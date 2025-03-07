import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import AddressForm from './AddressForm';

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('AddressForm component', () => {
  const onCloseMock = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders create form when no address is provided', () => {
    renderWithProviders(
      <AddressForm 
        open={true}
        onClose={onCloseMock}
        isEditing={false}
      />
    );
    
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Add New Address');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Add Address');
  });

  it('renders update form when address is provided', () => {
    const mockAddress = {
      addressId: '123',
      street: '123 Main St',
      city: 'Dublin',
      postalCode: 'D01 AB12',
      country: 'Ireland'
    };
    
    renderWithProviders(
      <AddressForm 
        open={true}
        onClose={onCloseMock}
        initialValues={mockAddress}
        isEditing={true}
      />
    );
    
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Edit Address');
    expect(screen.getByTestId('street-input')).toHaveValue('123 Main St');
    expect(screen.getByTestId('city-input')).toHaveValue('Dublin');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Update Address');
  });

  it('calls onClose when cancel button is clicked', () => {
    renderWithProviders(
      <AddressForm 
        open={true}
        onClose={onCloseMock}
      />
    );
    
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('allows form submission in create mode', () => {
    renderWithProviders(
      <AddressForm 
        open={true}
        onClose={onCloseMock}
        isEditing={false}
      />
    );
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('street-input'), {
      target: { value: '123 Main St' }
    });
    fireEvent.change(screen.getByTestId('city-input'), {
      target: { value: 'Dublin' }
    });
    fireEvent.change(screen.getByTestId('postal-code-input'), {
      target: { value: 'D01 AB12' }
    });
    
    // Just verify that the submit button is enabled and values are correctly set
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
    expect(screen.getByTestId('street-input')).toHaveValue('123 Main St');
    expect(screen.getByTestId('city-input')).toHaveValue('Dublin');
    expect(screen.getByTestId('postal-code-input')).toHaveValue('D01 AB12');
  });

  it('allows form submission in edit mode', () => {
    const mockAddress = {
      addressId: '123',
      street: '123 Main St',
      city: 'Dublin',
      postalCode: 'D01 AB12',
      country: 'Ireland'
    };
    
    renderWithProviders(
      <AddressForm 
        open={true}
        onClose={onCloseMock}
        initialValues={mockAddress}
        isEditing={true}
      />
    );
    
    // Change a field
    fireEvent.change(screen.getByTestId('street-input'), {
      target: { value: '456 New St' }
    });
    
    // Just verify that the submit button is enabled and values are correctly updated
    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
    expect(screen.getByTestId('street-input')).toHaveValue('456 New St');
  });

  it('is not visible when open is false', () => {
    renderWithProviders(
      <AddressForm 
        open={false}
        onClose={onCloseMock}
      />
    );
    
    expect(screen.queryByTestId('address-form-dialog')).not.toBeInTheDocument();
  });
});