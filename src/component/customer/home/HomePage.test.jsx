import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import HomePage from './HomePage';

// Mock MultipleItemsCarousel component
vi.mock('./MultiItemCarouse', () => ({
  default: () => <div data-testid="multiple-items-carousel">Carousel Mock</div>
}));

// Mock RestaurantCard component
vi.mock('../restaurant/RestaurantCard', () => ({
  default: ({ data }) => <div data-testid={`restaurant-card-${data.restaurantId}`}>{data.name}</div>
}));

describe('HomePage component', () => {
  it('renders hero section with correct content', () => {
    renderWithProviders(<HomePage />);
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('hero-title')).toHaveTextContent('Kyoka Food');
    expect(screen.getByTestId('hero-subtitle')).toHaveTextContent('Taste Food Fast and Delivered!');
  });

  it('renders top meals section with carousel', () => {
    renderWithProviders(<HomePage />);
    
    expect(screen.getByTestId('top-meals-section')).toBeInTheDocument();
    expect(screen.getByText('Top Meals')).toBeInTheDocument();
    expect(screen.getByTestId('multiple-items-carousel')).toBeInTheDocument();
  });

  it('renders restaurants section when restaurants exist', () => {
    const mockRestaurants = [
      { restaurantId: 'rest1', name: 'Pizza Place' },
      { restaurantId: 'rest2', name: 'Burger Joint' },
      { restaurantId: 'rest3', name: 'Sushi Bar' }
    ];
    
    renderWithProviders(<HomePage />, {
      preloadedState: {
        restaurant: {
          restaurants: mockRestaurants
        }
      }
    });
    
    expect(screen.getByTestId('restaurants-section')).toBeInTheDocument();
    expect(screen.getByTestId('restaurants-grid')).toBeInTheDocument();
    
    // Check restaurant cards
    expect(screen.getByTestId('restaurant-card-rest1')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-card-rest2')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-card-rest3')).toBeInTheDocument();
    
    expect(screen.getByText('Pizza Place')).toBeInTheDocument();
    expect(screen.getByText('Burger Joint')).toBeInTheDocument();
    expect(screen.getByText('Sushi Bar')).toBeInTheDocument();
  });

  it('renders restaurants section with empty grid when no restaurants exist', () => {
    renderWithProviders(<HomePage />, {
      preloadedState: {
        restaurant: {
          restaurants: []
        }
      }
    });
    
    expect(screen.getByTestId('restaurants-section')).toBeInTheDocument();
    expect(screen.getByTestId('restaurants-grid')).toBeInTheDocument();
    
    // No restaurant cards should be rendered
    expect(screen.queryByTestId(/^restaurant-card-/)).not.toBeInTheDocument();
  });
});