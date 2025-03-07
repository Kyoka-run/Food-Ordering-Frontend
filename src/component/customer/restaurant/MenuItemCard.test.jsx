import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import MenuItemCard from './MenuItemCard';
import * as cartActions from '../../../redux/actions/cartActions';

// Mock navigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

// Mock addItemToCart action
vi.mock('../../../redux/actions/cartActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/cartActions');
  return {
    ...actual,
    addItemToCart: vi.fn(() => ({ type: 'MOCK_ADD_ITEM_TO_CART' }))
  };
});

// Mock categorizedIngredients utility
vi.mock('../../../util/CategorizeIngredients', async () => {
  return {
    categorizedIngredients: (ingredients) => {
      // Simple mock implementation
      return ingredients.reduce((acc, ing) => {
        const category = ing.ingredientCategory?.name || 'Uncategorized';
        if (!acc[category]) acc[category] = [];
        acc[category].push(ing);
        return acc;
      }, {});
    }
  };
});

describe('MenuItemCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  // Test data
  const mockMenuItem = {
    foodId: 'food123',
    name: 'Test Food',
    description: 'Test description for the food item',
    price: 12.99,
    available: true,
    image: 'food-image.jpg',
    ingredients: [
      { 
        name: 'Cheese', 
        inStock: true,
        ingredientCategory: { name: 'Dairy' } 
      },
      { 
        name: 'Tomato', 
        inStock: true,
        ingredientCategory: { name: 'Vegetables' } 
      },
      { 
        name: 'Bacon', 
        inStock: false,
        ingredientCategory: { name: 'Meat' } 
      }
    ]
  };

  it('renders menu item information correctly', () => {
    renderWithProviders(<MenuItemCard item={mockMenuItem} />);
    
    expect(screen.getByTestId(`menu-item-${mockMenuItem.foodId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`menu-item-name-${mockMenuItem.foodId}`)).toHaveTextContent(mockMenuItem.name);
    expect(screen.getByTestId(`menu-item-description-${mockMenuItem.foodId}`)).toHaveTextContent(mockMenuItem.description);
    expect(screen.getByTestId(`menu-item-price-${mockMenuItem.foodId}`)).toHaveTextContent(`€${mockMenuItem.price}`);
    expect(screen.getByTestId(`menu-item-availability-${mockMenuItem.foodId}`)).toHaveTextContent('Available');
  });

  it('handles unavailable menu items correctly', () => {
    const unavailableItem = { ...mockMenuItem, available: false };
    
    renderWithProviders(<MenuItemCard item={unavailableItem} />);
    
    expect(screen.getByTestId(`menu-item-availability-${mockMenuItem.foodId}`)).toHaveTextContent('Out of Stock');
    expect(screen.getByTestId(`add-to-cart-button-${mockMenuItem.foodId}`)).toBeDisabled();
    expect(screen.getByTestId(`add-to-cart-button-${mockMenuItem.foodId}`)).toHaveTextContent('Out of Stock');
  });

  it('redirects to login when adding to cart without being logged in', () => {
    renderWithProviders(<MenuItemCard item={mockMenuItem} />, {
      preloadedState: {
        auth: { jwt: null }
      }
    });
    
    // Click the accordion to expand it
    fireEvent.click(screen.getByTestId(`menu-item-summary-${mockMenuItem.foodId}`));
    
    // Click add to cart button
    fireEvent.click(screen.getByTestId(`add-to-cart-button-${mockMenuItem.foodId}`));
    
    expect(navigateMock).toHaveBeenCalledWith('/account/login');
    expect(cartActions.addItemToCart).not.toHaveBeenCalled();
  });

  it('adds item to cart when logged in', () => {
    renderWithProviders(<MenuItemCard item={mockMenuItem} />, {
      preloadedState: {
        auth: { jwt: 'mock-jwt-token' }
      }
    });
    
    // Click the accordion to expand it
    fireEvent.click(screen.getByTestId(`menu-item-summary-${mockMenuItem.foodId}`));
    
    // Click add to cart button
    fireEvent.click(screen.getByTestId(`add-to-cart-button-${mockMenuItem.foodId}`));
    
    expect(cartActions.addItemToCart).toHaveBeenCalledWith({
      token: 'mock-jwt-token',
      cartItem: {
        foodId: mockMenuItem.foodId,
        quantity: 1,
        ingredients: []
      }
    });
  });

  it('shows ingredient categories when expanded', () => {
    renderWithProviders(<MenuItemCard item={mockMenuItem} />);
    
    // Initially, details should not be visible
    expect(screen.queryByTestId(`menu-item-details-${mockMenuItem.foodId}`)).not.toBeVisible();
    
    // Click to expand
    fireEvent.click(screen.getByTestId(`menu-item-summary-${mockMenuItem.foodId}`));
    
    // Now details should be visible
    expect(screen.getByTestId(`menu-item-details-${mockMenuItem.foodId}`)).toBeVisible();
    
    // Check that ingredient categories are shown
    expect(screen.getByTestId('ingredient-category-Dairy')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-category-Vegetables')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-category-Meat')).toBeInTheDocument();
  });
  
  it('allows selecting ingredients and adds them to cart', () => {
    renderWithProviders(<MenuItemCard item={mockMenuItem} />, {
      preloadedState: {
        auth: { jwt: 'mock-jwt-token' }
      }
    });
    
    // Click to expand
    fireEvent.click(screen.getByTestId(`menu-item-summary-${mockMenuItem.foodId}`));
    
    // Select an ingredient
    fireEvent.click(screen.getByTestId('ingredient-checkbox-Cheese'));
    
    // Add to cart
    fireEvent.click(screen.getByTestId(`add-to-cart-button-${mockMenuItem.foodId}`));
    
    // Check that selected ingredient was included
    expect(cartActions.addItemToCart).toHaveBeenCalledWith({
      token: 'mock-jwt-token',
      cartItem: {
        foodId: mockMenuItem.foodId,
        quantity: 1,
        ingredients: ['Cheese']
      }
    });
  });
  
  it('handles menu items with no ingredients gracefully', () => {
    const itemWithoutIngredients = { ...mockMenuItem, ingredients: undefined };
    
    renderWithProviders(<MenuItemCard item={itemWithoutIngredients} />);
    
    // Should render without errors
    expect(screen.getByTestId(`menu-item-${mockMenuItem.foodId}`)).toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(screen.getByTestId(`menu-item-summary-${mockMenuItem.foodId}`));
    
    // Should still have add to cart button
    expect(screen.getByTestId(`add-to-cart-button-${mockMenuItem.foodId}`)).toBeInTheDocument();
  });
});