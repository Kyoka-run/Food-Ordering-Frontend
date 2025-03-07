import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import RestaurantCard from './RestaurantCard';
import * as authActions from '../../../redux/actions/authActions';

// Mock navigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

// Mock addToFavorites action
vi.mock('../../../redux/actions/authActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/authActions');
  return {
    ...actual,
    addToFavorites: vi.fn(() => ({ type: 'MOCK_ADD_TO_FAVORITES' }))
  };
});

describe('RestaurantCard', () => {
  // Test data
  const mockRestaurant = {
    restaurantId: 'rest123',
    name: 'Test Restaurant',
    description: 'Test description for the restaurant',
    open: true,
    images: ['image1.jpg', 'image2.jpg']
  };

  it('renders restaurant information correctly', () => {
    renderWithProviders(<RestaurantCard data={mockRestaurant} />);
    
    expect(screen.getByTestId(`restaurant-card-${mockRestaurant.restaurantId}`)).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-name')).toHaveTextContent(mockRestaurant.name);
    expect(screen.getByTestId('restaurant-description')).toHaveTextContent('Test description');
    expect(screen.getByTestId('restaurant-status')).toHaveTextContent('Open');
  });

  it('displays closed status correctly', () => {
    const closedRestaurant = { ...mockRestaurant, open: false };
    
    renderWithProviders(<RestaurantCard data={closedRestaurant} />);
    
    expect(screen.getByTestId('restaurant-status')).toHaveTextContent('Closed');
  });

  it('navigates to restaurant page when clicked if restaurant is open', () => {
    renderWithProviders(<RestaurantCard data={mockRestaurant} />);
    
    fireEvent.click(screen.getByTestId('restaurant-card-clickable'));
    
    expect(navigateMock).toHaveBeenCalledWith(`/restaurant/${mockRestaurant.restaurantId}`);
  });

  it('does not navigate when clicked if restaurant is closed', () => {
    const closedRestaurant = { ...mockRestaurant, open: false };
    
    renderWithProviders(<RestaurantCard data={closedRestaurant} />);
    
    fireEvent.click(screen.getByTestId('restaurant-card-clickable'));
    
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('redirects to login when trying to add to favorites without being logged in', () => {
    renderWithProviders(<RestaurantCard data={mockRestaurant} />, {
      preloadedState: {
        auth: { jwt: null }
      }
    });
    
    fireEvent.click(screen.getByTestId('favorite-button'));
    
    expect(navigateMock).toHaveBeenCalledWith('/account/login');
    expect(authActions.addToFavorites).not.toHaveBeenCalled();
  });

  it('adds restaurant to favorites when logged in', () => {
    renderWithProviders(<RestaurantCard data={mockRestaurant} />, {
      preloadedState: {
        auth: { jwt: 'mock-jwt-token' }
      }
    });
    
    fireEvent.click(screen.getByTestId('favorite-button'));
    
    expect(authActions.addToFavorites).toHaveBeenCalledWith({
      restaurantId: mockRestaurant.restaurantId,
      jwt: 'mock-jwt-token'
    });
  });

  it('displays filled heart icon when restaurant is in favorites', () => {
    renderWithProviders(<RestaurantCard data={mockRestaurant} />, {
      preloadedState: {
        auth: {
          favorites: [{ restaurantId: mockRestaurant.restaurantId }]
        }
      }
    });
    
    expect(screen.getByTestId('favorite-icon-filled')).toBeInTheDocument();
    expect(screen.queryByTestId('favorite-icon-outline')).not.toBeInTheDocument();
  });

  it('displays outline heart icon when restaurant is not in favorites', () => {
    renderWithProviders(<RestaurantCard data={mockRestaurant} />, {
      preloadedState: {
        auth: {
          favorites: []
        }
      }
    });
    
    expect(screen.queryByTestId('favorite-icon-filled')).not.toBeInTheDocument();
    expect(screen.getByTestId('favorite-icon-outline')).toBeInTheDocument();
  });
});