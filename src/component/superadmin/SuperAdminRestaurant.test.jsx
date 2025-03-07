import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/test-utils';
import SuperAdminRestaurant from './SuperAdminRestaurant';

describe('SuperAdminRestaurant', () => {
  it('renders restaurant management page with title', () => {
    renderWithProviders(<SuperAdminRestaurant />);
    
    expect(screen.getByTestId('restaurant-management')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('Restaurant Management');
    expect(screen.getByTestId('restaurants-table')).toBeInTheDocument();
  });

  it('displays restaurant data correctly', () => {
    const mockRestaurants = [
      {
        restaurantId: 'rest1',
        name: 'Pizza Place',
        address: '123 Main St',
        cuisineType: 'Italian',
        open: true,
        images: ['image1.jpg', 'image2.jpg'],
        owner: {
          username: 'pizzaowner',
          email: 'owner@pizza.com'
        }
      },
      {
        restaurantId: 'rest2',
        name: 'Burger Joint',
        address: '456 Elm St',
        cuisineType: 'American',
        open: false,
        images: ['image3.jpg'],
        owner: {
          username: 'burgerowner',
          email: 'owner@burger.com'
        }
      }
    ];
    
    renderWithProviders(<SuperAdminRestaurant />, {
      preloadedState: {
        restaurant: {
          restaurants: mockRestaurants,
          loading: false
        }
      }
    });
    
    // Check if each restaurant is rendered
    mockRestaurants.forEach(restaurant => {
      expect(screen.getByTestId(`restaurant-row-${restaurant.restaurantId}`)).toBeInTheDocument();
      expect(screen.getByTestId(`restaurant-name-${restaurant.restaurantId}`)).toHaveTextContent(restaurant.name);
      expect(screen.getByTestId(`restaurant-id-${restaurant.restaurantId}`)).toHaveTextContent(restaurant.restaurantId);
      expect(screen.getByTestId(`restaurant-owner-${restaurant.restaurantId}`)).toHaveTextContent(restaurant.owner.username);
      expect(screen.getByTestId(`restaurant-owner-email-${restaurant.restaurantId}`)).toHaveTextContent(restaurant.owner.email);
      expect(screen.getByTestId(`restaurant-location-${restaurant.restaurantId}`)).toHaveTextContent(restaurant.address);
      expect(screen.getByTestId(`restaurant-cuisine-${restaurant.restaurantId}`)).toHaveTextContent(restaurant.cuisineType);
      
      // Check status chip
      const statusChip = screen.getByTestId(`restaurant-status-${restaurant.restaurantId}`);
      expect(statusChip).toHaveTextContent(restaurant.open ? "OPEN" : "CLOSED");
    });
  });

  it('displays empty state when no restaurants exist', () => {
    renderWithProviders(<SuperAdminRestaurant />, {
      preloadedState: {
        restaurant: {
          restaurants: [],
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('no-restaurants-message')).toBeInTheDocument();
    expect(screen.getByTestId('no-restaurants-message')).toHaveTextContent('No restaurants found');
  });

  it('renders restaurant images in avatar group', () => {
    const mockRestaurant = {
      restaurantId: 'rest1',
      name: 'Pizza Place',
      address: '123 Main St',
      cuisineType: 'Italian',
      open: true,
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
      owner: {
        username: 'pizzaowner',
        email: 'owner@pizza.com'
      }
    };
    
    renderWithProviders(<SuperAdminRestaurant />, {
      preloadedState: {
        restaurant: {
          restaurants: [mockRestaurant],
          loading: false
        }
      }
    });
    
    // Check if images are rendered (up to 3)
    for (let i = 0; i < Math.min(mockRestaurant.images.length, 3); i++) {
      expect(screen.getByTestId(`restaurant-image-${mockRestaurant.restaurantId}-${i}`)).toBeInTheDocument();
    }
  });
});