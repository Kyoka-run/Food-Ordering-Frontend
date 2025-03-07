import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../util/test-utils';
import SuperAdminNavbar from './SuperAdminNavbar';
import * as authActions from '../../redux/actions/authActions';

// Mock navigate and location
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ pathname: '/super-admin/customers' })
  };
});

// Mock logout action
vi.mock('../../redux/actions/authActions', async () => {
  const actual = await vi.importActual('../../redux/actions/authActions');
  return {
    ...actual,
    logout: vi.fn(() => ({ type: 'auth/logout' }))
  };
});

describe('SuperAdminNavbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all navigation tabs', () => {
    renderWithProviders(<SuperAdminNavbar />);
    
    expect(screen.getByTestId('super-admin-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('tab-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('tab-restaurants')).toBeInTheDocument();
    expect(screen.getByTestId('tab-customers')).toBeInTheDocument();
    expect(screen.getByTestId('tab-logout')).toBeInTheDocument();
  });

  it('navigates to correct route when tab is clicked', () => {
    renderWithProviders(<SuperAdminNavbar />);
    
    // Click the restaurants tab
    fireEvent.click(screen.getByTestId('tab-restaurants'));
    
    // Should navigate to restaurants page
    expect(navigateMock).toHaveBeenCalledWith('/super-admin/restaurants');
  });

  it('logs out when logout tab is clicked', () => {
    renderWithProviders(<SuperAdminNavbar />);
    
    // Click the Logout tab
    fireEvent.click(screen.getByTestId('tab-logout'));
    
    // Should call logout action and navigate home
    expect(authActions.logout).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('shows active tab based on current location', () => {
    renderWithProviders(<SuperAdminNavbar />);
    
    // With mocked location path as '/super-admin/customers',
    // the customers tab should be active
    const tabs = screen.getAllByRole('tab');
    const customersTab = screen.getByTestId('tab-customers');
    
    // Check aria-selected attribute for active state
    expect(customersTab.getAttribute('aria-selected')).toBe('true');
  });
});