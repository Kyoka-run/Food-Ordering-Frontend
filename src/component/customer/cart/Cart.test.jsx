import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import Cart from './Cart';
import * as orderActions from '../../../redux/actions/orderActions';
import * as cartActions from '../../../redux/actions/cartActions';
import * as addressActions from '../../../redux/actions/addressActions';
import * as totalPay from '../../../util/TotalPay';

// Mock actions
vi.mock('../../../redux/actions/orderActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/orderActions');
  return {
    ...actual,
    createOrder: vi.fn(() => ({ type: 'MOCK_CREATE_ORDER' }))
  };
});

vi.mock('../../../redux/actions/cartActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/cartActions');
  return {
    ...actual,
    findCart: vi.fn(() => ({ type: 'MOCK_FIND_CART' }))
  };
});

vi.mock('../../../redux/actions/addressActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/addressActions');
  return {
    ...actual,
    deleteAddress: vi.fn(() => ({ type: 'MOCK_DELETE_ADDRESS' }))
  };
});

// Mock the utility function
vi.mock('../../../util/TotalPay', () => ({
  cartTotal: vi.fn((items) => items.reduce((total, item) => total + item.totalPrice, 0))
}));

// Mock toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn()
  }
}));

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('Cart component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows empty cart view when cart is empty', () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { cartItems: [] }
      }
    });
    
    expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
    expect(screen.getByText('Your Cart Is Empty')).toBeInTheDocument();
  });

  it('displays cart items when cart is not empty', () => {
    const mockCartItems = [
      {
        cartItemId: '1',
        foodId: '101',
        foodName: 'Pizza',
        foodImage: 'pizza.jpg',
        quantity: 2,
        totalPrice: 25.99,
        ingredients: ['Cheese', 'Tomato'],
        foodRestaurantId: 'rest1'
      },
      {
        cartItemId: '2',
        foodId: '102',
        foodName: 'Burger',
        foodImage: 'burger.jpg',
        quantity: 1,
        totalPrice: 12.99,
        ingredients: ['Beef', 'Lettuce'],
        foodRestaurantId: 'rest1'
      }
    ];

    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { cartItems: mockCartItems },
        auth: { user: { addresses: [] } }
      }
    });
    
    expect(screen.getByTestId('cart-container')).toBeInTheDocument();
    expect(screen.getByTestId('cart-items-section')).toBeInTheDocument();
    expect(screen.getByTestId('order-summary')).toBeInTheDocument();
    expect(screen.getByTestId('items-total')).toHaveTextContent('€38.98');
  });

  it('calls findCart on mount', () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { cartItems: [] }
      }
    });
    
    expect(cartActions.findCart).toHaveBeenCalledWith('mock-jwt-token');
  });

  it('shows addresses and allows selection', () => {
    const mockCartItems = [
      {
        cartItemId: '1',
        foodName: 'Pizza',
        totalPrice: 25.99,
        quantity: 2,
        ingredients: [],
        foodRestaurantId: 'rest1'
      }
    ];

    const mockAddresses = [
      { addressId: 'addr1', street: '123 Main St', city: 'Dublin', postalCode: '12345', country: 'Ireland' },
      { addressId: 'addr2', street: '456 Oak St', city: 'Cork', postalCode: '54321', country: 'Ireland' }
    ];

    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { cartItems: mockCartItems },
        auth: { user: { addresses: mockAddresses } }
      }
    });
    
    expect(screen.getByTestId('address-section')).toBeInTheDocument();
    expect(screen.getByTestId('add-address-button')).toBeInTheDocument();

    // Address cards should be in the document
    const addressCards = screen.getAllByText(/Ireland/);
    expect(addressCards.length).toBe(2);
  });

  it('displays place order button as disabled when no address is selected', () => {
    const mockCartItems = [
      {
        cartItemId: '1',
        foodName: 'Pizza',
        totalPrice: 25.99,
        quantity: 2,
        ingredients: [],
        foodRestaurantId: 'rest1'
      }
    ];

    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { cartItems: mockCartItems },
        auth: { user: { addresses: [] } }
      }
    });
    
    const placeOrderButton = screen.getByTestId('place-order-button');
    expect(placeOrderButton).toBeDisabled();
  });

  it('calls createOrder when place order button is clicked with selected address', () => {
    const mockCartItems = [
      {
        cartItemId: '1',
        foodId: '101',
        foodName: 'Pizza',
        foodImage: 'pizza.jpg',
        quantity: 2,
        totalPrice: 25.99,
        ingredients: ['Cheese'],
        foodRestaurantId: 'rest1'
      }
    ];

    const mockAddresses = [
      { addressId: 'addr1', street: '123 Main St', city: 'Dublin', postalCode: '12345', country: 'Ireland' }
    ];

    // Set the total calculation mock to return fixed value
    totalPay.cartTotal.mockReturnValue(25.99);

    const { rerender } = renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { cartItems: mockCartItems },
        auth: { user: { addresses: mockAddresses } }
      }
    });

    // We need to trigger address selection
    // For simplicity, we'll rerender with a selected address in state
    rerender(
      <Cart />
    );

    // Find the AddressCard and trigger selection
    const addressCard = screen.getByText('123 Main St');
    fireEvent.click(addressCard);

    // Place the order
    const placeOrderButton = screen.getByTestId('place-order-button');
    expect(placeOrderButton).not.toBeDisabled();
    fireEvent.click(placeOrderButton);

    // Verify createOrder was called with correct data
    expect(orderActions.createOrder).toHaveBeenCalledWith({
      order: {
        restaurantId: 'rest1',
        amount: 30.99, // 25.99 + 5 (fees)
        addressId: 'addr1',
        items: [
          {
            foodId: '101',
            foodName: 'Pizza',
            foodImage: 'pizza.jpg',
            quantity: 2,
            totalPrice: 25.99,
            ingredients: ['Cheese']
          }
        ]
      },
      jwt: 'mock-jwt-token'
    });
  });
});