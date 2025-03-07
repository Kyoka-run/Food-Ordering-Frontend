import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import SearchDishCard from './SearchDishCard';

// Mock navigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

describe('SearchDishCard', () => {
  const mockItem = {
    foodId: 'food123',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato and cheese',
    price: 12.99,
    image: 'pizza.jpg',
    restaurantId: 'rest456',
    restaurantName: 'Italian Palace'
  };

  it('renders dish details correctly', () => {
    renderWithProviders(<SearchDishCard item={mockItem} />);
    
    // Check card is rendered
    expect(screen.getByTestId(`dish-card-${mockItem.foodId}`)).toBeInTheDocument();
    
    // Check dish details
    expect(screen.getByTestId(`restaurant-name-${mockItem.foodId}`)).toHaveTextContent(mockItem.restaurantName);
    expect(screen.getByTestId(`dish-name-${mockItem.foodId}`)).toHaveTextContent(mockItem.name);
    expect(screen.getByTestId(`dish-description-${mockItem.foodId}`)).toHaveTextContent(mockItem.description);
    expect(screen.getByTestId(`dish-price-${mockItem.foodId}`)).toHaveTextContent(`€${mockItem.price}`);
    
    // Check image
    const image = screen.getByTestId(`dish-image-${mockItem.foodId}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockItem.image);
    expect(image).toHaveAttribute('alt', mockItem.name);
  });

  it('navigates to restaurant page when arrow button is clicked', () => {
    renderWithProviders(<SearchDishCard item={mockItem} />);
    
    // Click the navigation button
    fireEvent.click(screen.getByTestId(`navigate-button-${mockItem.foodId}`));
    
    // Check navigation was called
    expect(navigateMock).toHaveBeenCalledWith(`/restaurant/${mockItem.restaurantId}`);
  });
});