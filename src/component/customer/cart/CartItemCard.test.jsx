import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import CartItemCard from './CartItemCard';
import * as cartActions from '../../../redux/actions/cartActions';

// Mock the cart actions
vi.mock('../../../redux/actions/cartActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/cartActions');
  return {
    ...actual,
    updateCartItem: vi.fn(() => ({ type: 'MOCK_UPDATE_CART_ITEM' })),
    removeCartItem: vi.fn(() => ({ type: 'MOCK_REMOVE_CART_ITEM' }))
  };
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('CartItemCard component', () => {
  const mockItem = {
    cartItemId: 'cart1',
    foodId: 'food1',
    foodName: 'Margherita Pizza',
    foodImage: 'pizza.jpg',
    quantity: 2,
    totalPrice: 25.99,
    ingredients: ['Cheese', 'Tomato']
  };
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders cart item details correctly', () => {
    renderWithProviders(<CartItemCard item={mockItem} />);
    
    expect(screen.getByTestId(`cart-item-${mockItem.cartItemId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`item-name-${mockItem.cartItemId}`)).toHaveTextContent(mockItem.foodName);
    expect(screen.getByTestId(`item-quantity-${mockItem.cartItemId}`)).toHaveTextContent(mockItem.quantity.toString());
    expect(screen.getByTestId(`item-price-${mockItem.cartItemId}`)).toHaveTextContent(`€${mockItem.totalPrice}`);
  });

  it('displays ingredients as chips', () => {
    renderWithProviders(<CartItemCard item={mockItem} />);
    
    const ingredientsContainer = screen.getByTestId(`item-ingredients-${mockItem.cartItemId}`);
    expect(ingredientsContainer).toBeInTheDocument();
    
    // Check for each ingredient
    mockItem.ingredients.forEach(ingredient => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });
  });

  it('calls updateCartItem with increased quantity when increase button clicked', () => {
    renderWithProviders(<CartItemCard item={mockItem} />);
    
    const increaseButton = screen.getByTestId(`increase-button-${mockItem.cartItemId}`);
    fireEvent.click(increaseButton);
    
    expect(cartActions.updateCartItem).toHaveBeenCalledWith({
      data: {
        cartItemId: mockItem.cartItemId,
        quantity: mockItem.quantity + 1
      },
      jwt: 'mock-jwt-token'
    });
  });

  it('calls updateCartItem with decreased quantity when decrease button clicked', () => {
    renderWithProviders(<CartItemCard item={mockItem} />);
    
    const decreaseButton = screen.getByTestId(`decrease-button-${mockItem.cartItemId}`);
    fireEvent.click(decreaseButton);
    
    expect(cartActions.updateCartItem).toHaveBeenCalledWith({
      data: {
        cartItemId: mockItem.cartItemId,
        quantity: mockItem.quantity - 1
      },
      jwt: 'mock-jwt-token'
    });
  });

  it('calls removeCartItem when decrease button clicked and quantity is 1', () => {
    const singleQuantityItem = {
      ...mockItem,
      quantity: 1
    };
    
    renderWithProviders(<CartItemCard item={singleQuantityItem} />);
    
    const decreaseButton = screen.getByTestId(`decrease-button-${mockItem.cartItemId}`);
    fireEvent.click(decreaseButton);
    
    expect(cartActions.removeCartItem).toHaveBeenCalledWith({
      cartItemId: mockItem.cartItemId,
      jwt: 'mock-jwt-token'
    });
  });
});