import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import Login from './Login';
import * as routerDom from 'react-router-dom';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

const navigateMock = vi.fn();

describe('Login component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByTestId('login-container')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent('Login');
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toHaveTextContent('Login');
    expect(screen.getByTestId('register-link')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    const errorMessage = 'Invalid credentials';
    
    renderWithProviders(<Login />, {
      preloadedState: {
        auth: { error: errorMessage }
      }
    });
    
    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
  });

  it('disables login button when loading', () => {
    renderWithProviders(<Login />, {
      preloadedState: {
        auth: { isLoading: true }
      }
    });
    
    expect(screen.getByTestId('login-button')).toBeDisabled();
    expect(screen.getByTestId('login-button')).toHaveTextContent('Logging in...');
  });

  it('navigates to register page when register link is clicked', () => {
    renderWithProviders(<Login />);
    
    fireEvent.click(screen.getByTestId('register-link'));
    
    expect(navigateMock).toHaveBeenCalledWith('/account/register');
  });

  it('allows form values to be entered', () => {
    renderWithProviders(<Login />);
    
    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'testuser' }
    });
    
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' }
    });
    
    expect(screen.getByTestId('username-input')).toHaveValue('testuser');
    expect(screen.getByTestId('password-input')).toHaveValue('password123');
  });

  it('shows validation errors when submitting empty form', async () => {
    renderWithProviders(<Login />);
    
    // Submit empty form
    fireEvent.click(screen.getByTestId('login-button'));
    
    // Wait for validation errors
    const usernameError = await screen.findByText('Username is required');
    const passwordError = await screen.findByText('Password is required');
    
    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});