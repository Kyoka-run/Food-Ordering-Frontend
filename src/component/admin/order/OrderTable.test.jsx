import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import OrderTable from './OrderTable';

describe('OrderTable', () => {
  const mockOrders = [
    {
      orderId: 'order1',
      restaurantName: 'Pizza Palace',
      userId: 'user1',
      orderStatus: 'PENDING',
      amount: 25.99,
      items: [
        { 
          orderItemId: 'item1', 
          foodName: 'Margherita Pizza', 
          foodImage: 'pizza.jpg',
          quantity: 2,
          totalPrice: 15.99,
          ingredients: ['Cheese', 'Tomato'] 
        },
        { 
          orderItemId: 'item2', 
          foodName: 'Cola', 
          foodImage: 'cola.jpg',
          quantity: 2,
          totalPrice: 4.99,
          ingredients: [] 
        }
      ]
    },
    {
      orderId: 'order2',
      restaurantName: 'Burger Joint',
      userId: 'user2',
      orderStatus: 'COMPLETED',
      amount: 32.50,
      items: [
        { 
          orderItemId: 'item3', 
          foodName: 'Cheeseburger', 
          foodImage: 'burger.jpg',
          quantity: 1,
          totalPrice: 12.99,
          ingredients: ['Beef', 'Cheese', 'Lettuce'] 
        }
      ]
    }
  ];

  it('renders orders correctly', () => {
    renderWithProviders(
      <OrderTable />,
      {
        preloadedState: {
          restaurantsOrder: {
            orders: mockOrders,
            loading: false
          }
        }
      }
    );
    
    expect(screen.getByTestId('order-table')).toBeInTheDocument();
    expect(screen.getByTestId(`order-row-${mockOrders[0].orderId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`order-id-${mockOrders[0].orderId}`)).toHaveTextContent(`#${mockOrders[0].orderId}`);
    expect(screen.getByTestId(`restaurant-name-${mockOrders[0].orderId}`)).toHaveTextContent('Pizza Palace');
    expect(screen.getByTestId(`status-chip-${mockOrders[0].orderId}`)).toHaveTextContent('PENDING');
  });

  it('displays empty message when no orders exist', () => {
    renderWithProviders(
      <OrderTable />,
      {
        preloadedState: {
          restaurantsOrder: {
            orders: [],
            loading: false
          }
        }
      }
    );
    
    expect(screen.getByTestId('no-orders-message')).toBeInTheDocument();
  });

  it('expands row when clicking expand button', () => {
    renderWithProviders(
      <OrderTable />,
      {
        preloadedState: {
          restaurantsOrder: {
            orders: mockOrders,
            loading: false
          }
        }
      }
    );
    
    // Initially expanded content should not be visible
    expect(screen.queryByTestId(`expanded-details-${mockOrders[0].orderId}`)).not.toBeInTheDocument();
    
    // Click expand button
    fireEvent.click(screen.getByTestId(`expand-button-${mockOrders[0].orderId}`));
    
    // Expanded content should now be visible
    expect(screen.getByTestId(`expanded-details-${mockOrders[0].orderId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`order-item-${mockOrders[0].items[0].orderItemId}`)).toBeInTheDocument();
  });

  it('opens status menu when clicking update status button', () => {
    renderWithProviders(
      <OrderTable />,
      {
        preloadedState: {
          restaurantsOrder: {
            orders: mockOrders,
            loading: false
          }
        }
      }
    );
    
    // Click status button
    fireEvent.click(screen.getByTestId(`status-button-${mockOrders[0].orderId}`));
    
    // Status menu should be visible
    expect(screen.getByTestId(`status-menu-${mockOrders[0].orderId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`status-option-${mockOrders[0].orderId}-COMPLETED`)).toBeInTheDocument();
    expect(screen.getByTestId(`status-option-${mockOrders[0].orderId}-CANCELLED`)).toBeInTheDocument();
  });

  it('renders in dashboard mode with limited orders', () => {
    // Create more than 5 orders
    const manyOrders = [
      ...mockOrders,
      ...Array(5).fill(0).map((_, i) => ({
        ...mockOrders[0],
        orderId: `order${i + 3}`
      }))
    ];
    
    renderWithProviders(
      <OrderTable isDashboard={true} title="Dashboard Orders" />,
      {
        preloadedState: {
          restaurantsOrder: {
            orders: manyOrders,
            loading: false
          }
        }
      }
    );
    
    // Should show title provided
    expect(screen.getByTestId('order-table-header')).toHaveTextContent('Dashboard Orders');
    
    // Should show max 5 orders in dashboard mode
    const orderRows = screen.getAllByTestId(/^order-row-/);
    expect(orderRows.length).toBeLessThanOrEqual(5);
    
    // Should not show status update buttons in dashboard mode
    expect(screen.queryByTestId(`status-button-${mockOrders[0].orderId}`)).not.toBeInTheDocument();
  });
});