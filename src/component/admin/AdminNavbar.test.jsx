import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../util/test-utils';
import AdminNavbar from './AdminNavbar';
import * as authActions from '../../redux/actions/authActions';

// Mock useNavigate and useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ 
      pathname: '/admin/restaurant/menu'
    })
  };
});

// Mock logout action
vi.mock('../../redux/actions/authActions', async () => {
  const actual = await vi.importActual('../../redux/actions/authActions');
  return {
    ...actual,
    logoutUser: vi.fn(() => ({ type: 'auth/logout' }))
  };
});

const navigateMock = vi.fn();

describe('AdminNavbar', () => {
  it('renders all navigation tabs', () => {
    renderWithProviders(<AdminNavbar />);
    
    expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-tab')).toBeInTheDocument();
    expect(screen.getByTestId('orders-tab')).toBeInTheDocument();
    expect(screen.getByTestId('menu-tab')).toBeInTheDocument();
    expect(screen.getByTestId('category-tab')).toBeInTheDocument();
    expect(screen.getByTestId('ingredients-tab')).toBeInTheDocument();
    expect(screen.getByTestId('events-tab')).toBeInTheDocument();
    expect(screen.getByTestId('logout-tab')).toBeInTheDocument();
  });

  it('navigates to correct route when tab is clicked', () => {
    renderWithProviders(<AdminNavbar />);
    
    // Click the Orders tab
    fireEvent.click(screen.getByTestId('orders-tab'));
    
    // Should navigate to orders page
    expect(navigateMock).toHaveBeenCalledWith('/admin/restaurant/orders');
  });

  it('logs out when logout tab is clicked', () => {
    renderWithProviders(<AdminNavbar />);
    
    // Click the Logout tab
    fireEvent.click(screen.getByTestId('logout-tab'));
    
    // Should call logout action and navigate home
    expect(authActions.logoutUser).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});