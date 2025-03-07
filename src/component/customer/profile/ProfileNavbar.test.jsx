import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import ProfileNavbar from './ProfileNavbar';
import * as authActions from '../../../redux/actions/authActions';

// Mock navigate and location
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ pathname: '/my-profile' })
  };
});

// Mock logout action
vi.mock('../../../redux/actions/authActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/authActions');
  return {
    ...actual,
    logoutUser: vi.fn(() => ({ type: 'auth/logout' }))
  };
});

describe('ProfileNavbar', () => {
  it('renders all tabs correctly', () => {
    renderWithProviders(<ProfileNavbar />);
    
    expect(screen.getByTestId('profile-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('tab-my-profile')).toBeInTheDocument();
    expect(screen.getByTestId('tab-orders')).toBeInTheDocument();
    expect(screen.getByTestId('tab-favorites')).toBeInTheDocument();
    expect(screen.getByTestId('tab-address')).toBeInTheDocument();
    expect(screen.getByTestId('tab-events')).toBeInTheDocument();
    expect(screen.getByTestId('tab-logout')).toBeInTheDocument();
  });

  it('navigates to correct route when tab is clicked', () => {
    renderWithProviders(<ProfileNavbar />);
    
    // Click the Orders tab
    fireEvent.click(screen.getByTestId('tab-orders'));
    
    // Should navigate to orders page
    expect(navigateMock).toHaveBeenCalledWith('/my-profile/orders');
  });

  it('logs out user when logout tab is clicked', () => {
    renderWithProviders(<ProfileNavbar />);
    
    // Click the Logout tab
    fireEvent.click(screen.getByTestId('tab-logout'));
    
    // Should call logout action and navigate home
    expect(authActions.logoutUser).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});