import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import RestaurantForm from './RestaurantForm';

describe('RestaurantForm', () => {
  const handleCloseMock = vi.fn();
  
  const mockRestaurant = {
    restaurantId: 'rest123',
    name: 'Italian Bistro',
    description: 'Authentic Italian cuisine',
    cuisineType: 'Italian',
    address: '123 Main St',
    openingHours: '9:00 AM - 9:00 PM',
    contactInformation: {
      email: 'contact@bistro.com',
      mobile: '123-456-7890',
      twitter: '@bistro',
      instagram: '@italianbistro'
    },
    images: [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg'
    ]
  };

  it('renders create form when no restaurant is provided', () => {
    renderWithProviders(
      <RestaurantForm handleClose={handleCloseMock} />
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create Restaurant');
    
    // Check that form fields are empty
    expect(screen.getByTestId('restaurant-name-input')).toHaveValue('');
    expect(screen.getByTestId('restaurant-description-input')).toHaveValue('');
  });

  it('renders update form when restaurant is provided', () => {
    renderWithProviders(
      <RestaurantForm handleClose={handleCloseMock} restaurant={mockRestaurant} />
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent('Update Restaurant');
    
    // Check that form fields are filled with restaurant data
    expect(screen.getByTestId('restaurant-name-input')).toHaveValue(mockRestaurant.name);
    expect(screen.getByTestId('restaurant-description-input')).toHaveValue(mockRestaurant.description);
    expect(screen.getByTestId('restaurant-cuisine-input')).toHaveValue(mockRestaurant.cuisineType);
    expect(screen.getByTestId('restaurant-address-input')).toHaveValue(mockRestaurant.address);
    expect(screen.getByTestId('restaurant-email-input')).toHaveValue(mockRestaurant.contactInformation.email);
  });

  it('allows adding image URLs', () => {
    renderWithProviders(
      <RestaurantForm handleClose={handleCloseMock} />
    );
    
    // Type in an image URL
    const imageInput = screen.getByTestId('image-url-input');
    fireEvent.change(imageInput, { target: { value: 'new-image.jpg' } });
    
    // Click add image button
    const addButton = screen.getByTestId('add-image-button');
    fireEvent.click(addButton);
    
    // Image should be added as a chip
    expect(screen.getByText('new-image.jpg')).toBeInTheDocument();
  });

  it('allows removing images', () => {
    renderWithProviders(
      <RestaurantForm handleClose={handleCloseMock} restaurant={mockRestaurant} />
    );
    
    // First image should be displayed as a chip
    expect(screen.getByTestId('image-chip-0')).toBeInTheDocument();
    expect(screen.getByText('image1.jpg')).toBeInTheDocument();
    
    // Find and click the delete icon for the first image
    // The delete icon is within the chip component
    const deleteIcon = screen.getByTestId('image-chip-0').querySelector('svg');
    fireEvent.click(deleteIcon);
    
    // Image should be removed
    expect(screen.queryByText('image1.jpg')).not.toBeInTheDocument();
  });

  it('calls handleClose when cancel button is clicked', () => {
    renderWithProviders(
      <RestaurantForm handleClose={handleCloseMock} />
    );
    
    // Click cancel button
    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);
    
    // handleClose should be called
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('allows updating form fields', () => {
    renderWithProviders(
      <RestaurantForm handleClose={handleCloseMock} />
    );
    
    // Update restaurant name
    const nameInput = screen.getByTestId('restaurant-name-input');
    fireEvent.change(nameInput, { target: { value: 'New Restaurant Name' } });
    
    // Check that value is updated
    expect(nameInput).toHaveValue('New Restaurant Name');
    
    // Update description
    const descriptionInput = screen.getByTestId('restaurant-description-input');
    fireEvent.change(descriptionInput, { target: { value: 'New description' } });
    
    // Check that value is updated
    expect(descriptionInput).toHaveValue('New description');
  });
});