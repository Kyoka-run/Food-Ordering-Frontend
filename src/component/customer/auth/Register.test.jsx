import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import Register from './Register';
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

describe('Register component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders registration form correctly', () => {
    renderWithProviders(<Register />);
    
    expect(screen.getByTestId('register-container')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent('Register');
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('role-input')).toBeInTheDocument();
    expect(screen.getByTestId('register-button')).toHaveTextContent('Register');
    expect(screen.getByTestId('login-link')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    const errorMessage = 'Registration failed';
    
    renderWithProviders(<Register />, {
      preloadedState: {
        auth: { error: errorMessage }
      }
    });
    
    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
  });

  it('navigates to login page when login link is clicked', () => {
    renderWithProviders(<Register />);
    
    fireEvent.click(screen.getByTestId('login-link'));
    
    expect(navigateMock).toHaveBeenCalledWith('/account/login');
  });

  it('allows form values to be entered', () => {
    renderWithProviders(<Register />);
    
    // Fill form fields
    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'testuser' }
    });
    
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'Password123' }
    });
    
    // Check input values
    expect(screen.getByTestId('username-input')).toHaveValue('testuser');
    expect(screen.getByTestId('email-input')).toHaveValue('test@example.com');
    expect(screen.getByTestId('password-input')).toHaveValue('Password123');
  });
});