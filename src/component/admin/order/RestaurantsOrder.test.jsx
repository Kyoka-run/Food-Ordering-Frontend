import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import RestaurantsOrder from './RestaurantsOrder';
import * as reactRouterDom from 'react-router-dom';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ 
      search: '', 
      pathname: '/admin/restaurant/orders' 
    })
  };
});

const navigateMock = vi.fn();

describe('RestaurantsOrder', () => {
  const mockOrders = [
    {
      orderId: 'order1',
      restaurantName: 'Pizza Palace',
      userId: 'user1',
      orderStatus: 'PENDING',
      amount: 25.99,
      items: []
    },
    {
      orderId: 'order2',
      restaurantName: 'Burger Joint',
      userId: 'user2',
      orderStatus: 'COMPLETED',
      amount: 32.50,
      items: []
    },
    {
      orderId: 'order3',
      restaurantName: 'Sushi Bar',
      userId: 'user3',
      orderStatus: 'CANCELLED',
      amount: 45.00,
      items: []
    }
  ];

  it('renders order management page with stats', () => {
    renderWithProviders(
      <RestaurantsOrder />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          restaurantsOrder: {
            orders: mockOrders,
            loading: false
          }
        }
      }
    );
    
    // Check page title
    expect(screen.getByTestId('page-title')).toHaveTextContent('Orders Management');
    
    // Check filter section
    expect(screen.getByTestId('filter-section')).toBeInTheDocument();
    expect(screen.getByTestId('filter-option-all')).toBeInTheDocument();
    
    // Check stats cards
    expect(screen.getByTestId('total-orders-count')).toHaveTextContent('3');
    expect(screen.getByTestId('pending-orders-count')).toHaveTextContent('1');
    expect(screen.getByTestId('completed-orders-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cancelled-orders-count')).toHaveTextContent('1');
    
    // Check order table is rendered
    expect(screen.getByTestId('order-table')).toBeInTheDocument();
  });

  it('changes filter when radio button is clicked', () => {
    renderWithProviders(
      <RestaurantsOrder />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          restaurantsOrder: {
            orders: mockOrders,
            loading: false
          }
        }
      }
    );
    
    // Click on Pending filter
    fireEvent.click(screen.getByTestId('filter-option-PENDING').querySelector('input'));
    
    // Should navigate with updated query params
    expect(navigateMock).toHaveBeenCalledWith(
      expect.objectContaining({ 
        search: expect.stringContaining('order_status=PENDING') 
      })
    );
  });

  it('renders empty stats when no orders exist', () => {
    renderWithProviders(
      <RestaurantsOrder />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          restaurantsOrder: {
            orders: [],
            loading: false
          }
        }
      }
    );
    
    // Check empty stats
    expect(screen.getByTestId('total-orders-count')).toHaveTextContent('0');
    expect(screen.getByTestId('pending-orders-count')).toHaveTextContent('0');
    expect(screen.getByTestId('completed-orders-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cancelled-orders-count')).toHaveTextContent('0');
  });
});