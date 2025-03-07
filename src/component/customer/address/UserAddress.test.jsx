import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import UserAddress from './UserAddress';

// Mock the AddressCard component
vi.mock('./AddressCard', () => ({
  default: ({ address, onEdit, onDelete }) => (
    <div 
      data-testid={`address-card-${address.addressId}`}
      className="address-card-mock"
    >
      <span data-testid={`address-street-${address.addressId}`}>{address.street}</span>
      <button 
        onClick={() => onEdit(address)} 
        data-testid={`edit-button-${address.addressId}`}
      >
        Edit
      </button>
      <button 
        onClick={() => onDelete(address.addressId)} 
        data-testid={`delete-button-${address.addressId}`}
      >
        Delete
      </button>
    </div>
  )
}));

// Mock the AddressForm component
vi.mock('./AddressForm', () => ({
  default: ({ open, onClose, initialValues, isEditing }) => open ? (
    <div data-testid="address-form-dialog">
      <div data-testid="dialog-title">
        {isEditing ? 'Edit Address' : 'Add New Address'}
      </div>
      {initialValues && (
        <input 
          data-testid="street-input" 
          defaultValue={initialValues.street} 
        />
      )}
    </div>
  ) : null
}));

// Mock DeleteConfirmationDialog
vi.mock('../../DeleteConfirmationDialog', () => ({
  default: ({ open, onClose, onConfirm, title, itemName }) => open ? (
    <div data-testid="delete-confirmation-dialog">
      <span data-testid="item-name">{itemName}</span>
      <button data-testid="confirm-button" onClick={onConfirm}>Confirm</button>
      <button data-testid="cancel-button" onClick={onClose}>Cancel</button>
    </div>
  ) : null
}));

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('UserAddress component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders addresses correctly', () => {
    const mockAddresses = [
      { addressId: '1', street: '123 Main St', city: 'Dublin', country: 'Ireland' },
      { addressId: '2', street: '456 Elm St', city: 'Cork', country: 'Ireland' }
    ];
    
    renderWithProviders(<UserAddress />, {
      preloadedState: {
        auth: { 
          user: { addresses: mockAddresses } 
        },
        address: { loading: false }
      }
    });
    
    // Check title
    expect(screen.getByTestId('page-title')).toHaveTextContent('Addresses');
    
    // Check that address cards are rendered
    expect(screen.getByTestId('addresses-list')).toBeInTheDocument();
    mockAddresses.forEach(address => {
      expect(screen.getByTestId(`address-card-${address.addressId}`)).toBeInTheDocument();
      expect(screen.getByTestId(`address-street-${address.addressId}`)).toHaveTextContent(address.street);
    });
    
    // Check that add button is rendered
    expect(screen.getByTestId('add-address-button')).toBeInTheDocument();
  });

  it('displays empty state when no addresses exist', () => {
    renderWithProviders(<UserAddress />, {
      preloadedState: {
        auth: { 
          user: { addresses: [] } 
        },
        address: { loading: false }
      }
    });
    
    expect(screen.getByTestId('no-addresses-message')).toBeInTheDocument();
  });

  it('opens address form when add button is clicked', () => {
    renderWithProviders(<UserAddress />, {
      preloadedState: {
        auth: { 
          user: { addresses: [] } 
        },
        address: { loading: false }
      }
    });
    
    // Click add button
    fireEvent.click(screen.getByTestId('add-address-button'));
    
    // Check that form modal is opened
    expect(screen.getByTestId('address-form-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Add New Address');
  });

  it('opens address form in edit mode when edit button is clicked', () => {
    const mockAddresses = [
      { addressId: '1', street: '123 Main St', city: 'Dublin', country: 'Ireland' }
    ];
    
    renderWithProviders(<UserAddress />, {
      preloadedState: {
        auth: { 
          user: { addresses: mockAddresses } 
        },
        address: { loading: false }
      }
    });
    
    // Click edit button on address card
    fireEvent.click(screen.getByTestId(`edit-button-${mockAddresses[0].addressId}`));
    
    // Check that form modal is opened in edit mode
    expect(screen.getByTestId('address-form-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Edit Address');
    expect(screen.getByTestId('street-input')).toHaveValue(mockAddresses[0].street);
  });

  it('opens delete confirmation dialog when delete button is clicked', () => {
    const mockAddresses = [
      { addressId: '1', street: '123 Main St', city: 'Dublin', country: 'Ireland' }
    ];
    
    renderWithProviders(<UserAddress />, {
      preloadedState: {
        auth: { 
          user: { addresses: mockAddresses } 
        },
        address: { loading: false }
      }
    });
    
    // Click delete button on address card
    fireEvent.click(screen.getByTestId(`delete-button-${mockAddresses[0].addressId}`));
    
    // Check that delete confirmation dialog is opened
    expect(screen.getByTestId('delete-confirmation-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('item-name')).toHaveTextContent(mockAddresses[0].street);
  });
});