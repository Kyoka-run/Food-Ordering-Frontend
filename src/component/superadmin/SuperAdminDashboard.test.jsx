import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/test-utils';
import SuperAdminDashboard from './SuperAdminDashboard';

describe('SuperAdminDashboard', () => {
  it('renders dashboard with correct title', () => {
    renderWithProviders(<SuperAdminDashboard />);
    
    expect(screen.getByTestId('super-admin-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-title')).toHaveTextContent('Dashboard Overview');
  });

  it('displays correct restaurant count', () => {
    const mockRestaurants = Array(5).fill(0).map((_, index) => ({
      restaurantId: `rest${index}`,
      name: `Restaurant ${index}`
    }));
    
    renderWithProviders(<SuperAdminDashboard />, {
      preloadedState: {
        restaurant: {
          restaurants: mockRestaurants
        }
      }
    });
    
    expect(screen.getByTestId('total-restaurants-count')).toHaveTextContent('5');
  });

  it('displays correct customer count', () => {
    const mockCustomers = Array(10).fill(0).map((_, index) => ({
      userId: `user${index}`,
      username: `user${index}`
    }));
    
    renderWithProviders(<SuperAdminDashboard />, {
      preloadedState: {
        superAdmin: {
          customers: mockCustomers
        }
      }
    });
    
    expect(screen.getByTestId('total-customers-count')).toHaveTextContent('10');
  });

  it('shows zero counts when no data is available', () => {
    renderWithProviders(<SuperAdminDashboard />, {
      preloadedState: {
        restaurant: {
          restaurants: []
        },
        superAdmin: {
          customers: []
        }
      }
    });
    
    expect(screen.getByTestId('total-restaurants-count')).toHaveTextContent('0');
    expect(screen.getByTestId('total-customers-count')).toHaveTextContent('0');
  });

  it('renders recent activities card', () => {
    renderWithProviders(<SuperAdminDashboard />);
    
    expect(screen.getByTestId('recent-activities-card')).toBeInTheDocument();
    expect(screen.getByTestId('recent-activities-card')).toHaveTextContent('No recent activities to display');
  });
});