import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import UserProfile from './UserProfile';
import * as authActions from '../../../redux/actions/authActions';

// Mock navigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock
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

describe('UserProfile', () => {
  it('renders user information correctly', () => {
    const mockUser = {
      username: 'testuser',
      email: 'test@example.com'
    };
    
    renderWithProviders(<UserProfile />, {
      preloadedState: {
        auth: { user: mockUser }
      }
    });
    
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    expect(screen.getByTestId('profile-icon')).toBeInTheDocument();
    expect(screen.getByTestId('username')).toHaveTextContent(mockUser.username);
    expect(screen.getByTestId('email')).toHaveTextContent(mockUser.email);
  });

  it('logs out and navigates to home when logout button is clicked', () => {
    renderWithProviders(<UserProfile />, {
      preloadedState: {
        auth: { user: { username: 'testuser', email: 'test@example.com' } }
      }
    });
    
    // Click logout button
    fireEvent.click(screen.getByTestId('logout-button'));
    
    // Check that logout was called and navigation happened
    expect(authActions.logoutUser).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});