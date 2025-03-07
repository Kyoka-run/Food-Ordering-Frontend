import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderCard from './OrderCard';

describe('OrderCard component', () => {
  const mockOrder = {
    orderId: 'order123',
    restaurantName: 'Pizza Palace',
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
  };

  it('renders order summary correctly', () => {
    render(<OrderCard order={mockOrder} />);
    
    expect(screen.getByTestId(`order-card-${mockOrder.orderId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`restaurant-name-${mockOrder.orderId}`)).toHaveTextContent('Pizza Palace');
    expect(screen.getByTestId(`order-id-${mockOrder.orderId}`)).toHaveTextContent(`Order #${mockOrder.orderId}`);
    expect(screen.getByTestId(`order-amount-${mockOrder.orderId}`)).toHaveTextContent('€25.99');
    expect(screen.getByTestId(`status-chip-${mockOrder.orderId}`)).toHaveTextContent('PENDING');
  });

  it('does not show order details when collapsed', () => {
    render(<OrderCard order={mockOrder} />);
    
    expect(screen.queryByTestId(`expanded-details-${mockOrder.orderId}`)).not.toBeInTheDocument();
  });

  it('shows order details when expanded', () => {
    render(<OrderCard order={mockOrder} />);
    
    // Click expand button
    fireEvent.click(screen.getByTestId(`expand-button-${mockOrder.orderId}`));
    
    // Order details should now be visible
    expect(screen.getByTestId(`expanded-details-${mockOrder.orderId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`order-item-${mockOrder.items[0].orderItemId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`item-name-${mockOrder.items[0].orderItemId}`)).toHaveTextContent('Margherita Pizza × 2');
    expect(screen.getByTestId(`item-ingredients-${mockOrder.items[0].orderItemId}`)).toHaveTextContent('Cheese, Tomato');
    expect(screen.getByTestId(`item-price-${mockOrder.items[0].orderItemId}`)).toHaveTextContent('€15.99');
  });

  it('toggles expanded state when clicking expand button', () => {
    render(<OrderCard order={mockOrder} />);
    
    // Initially expanded content should not be visible
    expect(screen.queryByTestId(`expanded-details-${mockOrder.orderId}`)).not.toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(screen.getByTestId(`expand-button-${mockOrder.orderId}`));
    expect(screen.getByTestId(`expanded-details-${mockOrder.orderId}`)).toBeInTheDocument();
  });

  it('renders correct status chip color for different statuses', () => {
    // Test PENDING status
    const pendingOrder = { ...mockOrder, orderStatus: 'PENDING' };
    const { rerender } = render(<OrderCard order={pendingOrder} />);
    let statusChip = screen.getByTestId(`status-chip-${mockOrder.orderId}`);
    expect(statusChip).toHaveClass('MuiChip-colorWarning');
    
    // Test COMPLETED status
    const completedOrder = { ...mockOrder, orderStatus: 'COMPLETED' };
    rerender(<OrderCard order={completedOrder} />);
    statusChip = screen.getByTestId(`status-chip-${mockOrder.orderId}`);
    expect(statusChip).toHaveClass('MuiChip-colorSuccess');
    
    // Test CANCELLED status
    const cancelledOrder = { ...mockOrder, orderStatus: 'CANCELLED' };
    rerender(<OrderCard order={cancelledOrder} />);
    statusChip = screen.getByTestId(`status-chip-${mockOrder.orderId}`);
    expect(statusChip).toHaveClass('MuiChip-colorError');
  });
});