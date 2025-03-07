import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/test-utils';
import SuperAdminCustomer from './SuperAdminCustomer';
import * as superAdminActions from '../../redux/actions/superAdminActions';

// Mock getCustomers action
vi.mock('../../redux/actions/superAdminActions', async () => {
  const actual = await vi.importActual('../../redux/actions/superAdminActions');
  return {
    ...actual,
    getCustomers: vi.fn(() => ({ type: 'MOCK_GET_CUSTOMERS' }))
  };
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('SuperAdminCustomer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches customers on mount', () => {
    renderWithProviders(<SuperAdminCustomer />);
    
    expect(superAdminActions.getCustomers).toHaveBeenCalledWith('mock-jwt-token');
  });

  it('renders customer table with data', () => {
    const mockCustomers = [
      {
        userId: 'user1',
        username: 'johndoe',
        email: 'john@example.com',
        roles: ['ROLE_USER'],
        status: 'ACTIVE'
      },
      {
        userId: 'user2',
        username: 'janedoe',
        email: 'jane@example.com',
        roles: ['ROLE_USER', 'ROLE_RESTAURANT_OWNER'],
        status: 'ACTIVE'
      }
    ];
    
    renderWithProviders(<SuperAdminCustomer />, {
      preloadedState: {
        superAdmin: {
          customers: mockCustomers,
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('customer-management')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('Customer Management');
    expect(screen.getByTestId('customers-table')).toBeInTheDocument();
    
    // Check if each customer is rendered
    mockCustomers.forEach(customer => {
      expect(screen.getByTestId(`customer-row-${customer.userId}`)).toBeInTheDocument();
      expect(screen.getByTestId(`customer-name-${customer.userId}`)).toHaveTextContent(customer.username);
      expect(screen.getByTestId(`customer-email-${customer.userId}`)).toHaveTextContent(customer.email);
      expect(screen.getByTestId(`customer-id-${customer.userId}`)).toHaveTextContent(customer.userId);
      expect(screen.getByTestId(`customer-roles-${customer.userId}`)).toHaveTextContent(customer.roles.join(", "));
      expect(screen.getByTestId(`customer-status-${customer.userId}`)).toHaveTextContent(customer.status);
    });
  });

  it('displays empty state when no customers exist', () => {
    renderWithProviders(<SuperAdminCustomer />, {
      preloadedState: {
        superAdmin: {
          customers: [],
          loading: false
        }
      }
    });
    
    expect(screen.getByTestId('no-customers-message')).toBeInTheDocument();
    expect(screen.getByTestId('no-customers-message')).toHaveTextContent('No customers found');
  });

  it('limits displayed customers in dashboard mode', () => {
    const mockCustomers = Array(10).fill(0).map((_, index) => ({
      userId: `user${index}`,
      username: `user${index}`,
      email: `user${index}@example.com`,
      roles: ['ROLE_USER'],
      status: 'ACTIVE'
    }));
    
    renderWithProviders(<SuperAdminCustomer isDashboard={true} />, {
      preloadedState: {
        superAdmin: {
          customers: mockCustomers,
          loading: false
        }
      }
    });
    
    // In dashboard mode, should only show first 5 customers
    const customerRows = screen.getAllByTestId(/^customer-row-/);
    expect(customerRows.length).toBe(5);
  });
});