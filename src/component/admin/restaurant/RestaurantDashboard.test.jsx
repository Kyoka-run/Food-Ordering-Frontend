import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import RestaurantDashboard from './RestaurantDashboard';

describe('RestaurantDashboard', () => {
  const mockRestaurant = {
    restaurantId: 'rest123',
    name: 'Italian Bistro',
    description: 'Authentic Italian cuisine',
    address: '123 Main St',
    openingHours: '9:00 AM - 9:00 PM',
    open: true,
    contactInformation: {
      email: 'contact@bistro.com',
      mobile: '123-456-7890'
    },
    images: [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg'
    ]
  };

  it('renders "no restaurant" view when restaurant is not available', () => {
    renderWithProviders(
      <RestaurantDashboard />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: null
          }
        }
      }
    );
    
    // Should show "no restaurant found" message
    expect(screen.getByTestId('no-restaurant-view')).toBeInTheDocument();
    expect(screen.getByText('No Restaurant Found')).toBeInTheDocument();
    expect(screen.getByTestId('create-restaurant-button')).toBeInTheDocument();
  });

  it('renders restaurant details when restaurant is available', () => {
    renderWithProviders(
      <RestaurantDashboard />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: mockRestaurant
          }
        }
      }
    );
    
    // Should display restaurant details
    expect(screen.getByTestId('restaurant-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-name')).toHaveTextContent(mockRestaurant.name);
    expect(screen.getByTestId('restaurant-description')).toHaveTextContent(mockRestaurant.description);
    expect(screen.getByTestId('restaurant-address')).toHaveTextContent(mockRestaurant.address);
    expect(screen.getByTestId('restaurant-opening-hours')).toHaveTextContent(mockRestaurant.openingHours);
    expect(screen.getByTestId('restaurant-email')).toHaveTextContent(mockRestaurant.contactInformation.email);
    expect(screen.getByTestId('restaurant-mobile')).toHaveTextContent(mockRestaurant.contactInformation.mobile);
  });

  it('displays open/close button correctly', () => {
    renderWithProviders(
      <RestaurantDashboard />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: mockRestaurant
          }
        }
      }
    );
    
    // Restaurant is open, so should show "Close Restaurant" button
    const statusButton = screen.getByTestId('status-toggle-button');
    expect(statusButton).toBeInTheDocument();
    expect(statusButton).toHaveTextContent('Close Restaurant');
  });

  it('opens create restaurant modal when button is clicked in no-restaurant view', () => {
    renderWithProviders(
      <RestaurantDashboard />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: null
          }
        }
      }
    );
    
    // Click create restaurant button
    fireEvent.click(screen.getByTestId('create-restaurant-button'));
    
    // Modal should open
    expect(screen.getByTestId('restaurant-modal')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent(/Create Restaurant/i);
  });

  it('opens edit restaurant modal when edit button is clicked', () => {
    renderWithProviders(
      <RestaurantDashboard />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: mockRestaurant
          }
        }
      }
    );
    
    // Find and click edit button
    fireEvent.click(screen.getByTestId('edit-restaurant-button'));
    
    // Modal should open in edit mode
    expect(screen.getByTestId('restaurant-modal')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent(/Update Restaurant/i);
    expect(screen.getByTestId('restaurant-name-input')).toHaveValue(mockRestaurant.name);
  });

  it('opens delete confirmation dialog when delete button is clicked', () => {
    renderWithProviders(
      <RestaurantDashboard />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: mockRestaurant
          }
        }
      }
    );
    
    // Find and click delete button
    fireEvent.click(screen.getByTestId('delete-restaurant-button'));
    
    // Delete confirmation dialog should open
    expect(screen.getByTestId('delete-confirmation-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Delete Restaurant');
    expect(screen.getByTestId('item-name')).toHaveTextContent(mockRestaurant.name);
  });
});