import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import AddressCard from './AddressCard';

describe('AddressCard component', () => {
  const mockAddress = {
    addressId: 'addr123',
    street: '123 Main St',
    city: 'Dublin',
    postalCode: 'D01 AB12',
    country: 'Ireland'
  };

  it('renders address details correctly', () => {
    render(
      <AddressCard 
        address={mockAddress} 
        onEdit={() => {}} 
        onDelete={() => {}} 
      />
    );
    
    expect(screen.getByTestId(`address-card-${mockAddress.addressId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`address-street-${mockAddress.addressId}`)).toHaveTextContent(mockAddress.street);
    expect(screen.getByTestId(`address-city-${mockAddress.addressId}`)).toHaveTextContent(`${mockAddress.city}, ${mockAddress.postalCode}`);
    expect(screen.getByTestId(`address-country-${mockAddress.addressId}`)).toHaveTextContent(mockAddress.country);
  });

  it('calls onEdit with address when edit button is clicked', () => {
    const onEditMock = vi.fn();
    
    render(
      <AddressCard 
        address={mockAddress} 
        onEdit={onEditMock} 
        onDelete={() => {}} 
      />
    );
    
    fireEvent.click(screen.getByTestId(`edit-address-${mockAddress.addressId}`));
    expect(onEditMock).toHaveBeenCalledWith(mockAddress);
  });

  it('calls onDelete with addressId when delete button is clicked', () => {
    const onDeleteMock = vi.fn();
    
    render(
      <AddressCard 
        address={mockAddress} 
        onEdit={() => {}} 
        onDelete={onDeleteMock} 
      />
    );
    
    fireEvent.click(screen.getByTestId(`delete-address-${mockAddress.addressId}`));
    expect(onDeleteMock).toHaveBeenCalledWith(mockAddress.addressId);
  });

  it('calls onSelect with address when card is clicked', () => {
    const onSelectMock = vi.fn();
    
    render(
      <AddressCard 
        address={mockAddress} 
        onEdit={() => {}} 
        onDelete={() => {}} 
        onSelect={onSelectMock}
      />
    );
    
    fireEvent.click(screen.getByTestId(`address-card-${mockAddress.addressId}`));
    expect(onSelectMock).toHaveBeenCalledWith(mockAddress);
  });

  it('applies selected styles when selected is true', () => {
    render(
      <AddressCard 
        address={mockAddress} 
        onEdit={() => {}} 
        onDelete={() => {}} 
        selected={true}
      />
    );
    
    const card = screen.getByTestId(`address-card-${mockAddress.addressId}`);
    expect(card.className).toContain('border-blue-500');
    expect(card.className).toContain('bg-blue-50');
  });

  it('hides action buttons when showActions is false', () => {
    render(
      <AddressCard 
        address={mockAddress} 
        onEdit={() => {}} 
        onDelete={() => {}} 
        showActions={false}
      />
    );
    
    expect(screen.queryByTestId(`edit-address-${mockAddress.addressId}`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`delete-address-${mockAddress.addressId}`)).not.toBeInTheDocument();
  });
});