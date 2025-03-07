import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import Orders from './Order';
import * as orderActions from '../../../redux/actions/orderActions';

// Mock the order actions
vi.mock('../../../redux/actions/orderActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/orderActions');
  return {
    ...actual,
    getUserOrders: vi.fn(() => ({ type: 'MOCK_GET_USER_ORDERS' }))
  };
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('Orders component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches orders on mount', () => {
    renderWithProviders(<Orders />);
    
    expect(orderActions.getUserOrders).toHaveBeenCalledWith('mock-jwt-token');
  });

  it('displays empty state when no orders exist', () => {
    renderWithProviders(<Orders />, {
      preloadedState: {
        order: {
          orders: [],
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('no-orders-message')).toBeInTheDocument();
    expect(screen.queryByTestId('orders-list')).not.toBeInTheDocument();
  });

  it('displays orders summary and list when orders exist', () => {
    const mockOrders = [
      {
        orderId: 'order1',
        restaurantName: 'Pizza Place',
        orderStatus: 'PENDING',
        amount: 25.99,
        items: []
      },
      {
        orderId: 'order2',
        restaurantName: 'Burger Joint',
        orderStatus: 'COMPLETED',
        amount: 18.50,
        items: []
      }
    ];
    
    renderWithProviders(<Orders />, {
      preloadedState: {
        order: {
          orders: mockOrders,
          loading: false
        }
      }
    });
    
    expect(screen.queryByTestId('no-orders-message')).not.toBeInTheDocument();
    expect(screen.getByTestId('orders-list')).toBeInTheDocument();
    expect(screen.getByTestId('orders-summary')).toBeInTheDocument();
    expect(screen.getByTestId('total-orders-count')).toHaveTextContent('2');
    expect(screen.getByTestId('pending-orders-count')).toHaveTextContent('1 pending');
    
    // Check that order cards are rendered
    expect(screen.getByTestId(`order-card-${mockOrders[0].orderId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`order-card-${mockOrders[1].orderId}`)).toBeInTheDocument();
  });

  it('displays loading state when loading', () => {
    renderWithProviders(<Orders />, {
      preloadedState: {
        order: {
          orders: [],
          loading: true
        }
      }
    });
    
    // No empty message should be shown during loading
    expect(screen.queryByTestId('no-orders-message')).not.toBeInTheDocument();
  });
});