import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../util/test-utils';
import Navbar from './Navbar';

// Mock functions
const navigateMock = vi.fn();

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

describe('Navbar component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    navigateMock.mockReset();
  });
  
  it('renders without crashing', () => {
    renderWithProviders(<Navbar />);
    
    // Check that the navbar is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    // Check that the home link is visible
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('displays login icon for unauthenticated users', () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: { user: null }
      }
    });
    
    // Check that login button is rendered
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    // And user avatar is not rendered
    expect(screen.queryByTestId('user-avatar')).not.toBeInTheDocument();
  });

  it('displays user avatar for authenticated users', () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: { 
          user: { username: 'testuser' } 
        }
      }
    });
    
    // Check that the user avatar is rendered
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
    // And login button is not rendered
    expect(screen.queryByTestId('login-button')).not.toBeInTheDocument();
    // Check that the avatar with the first letter of username is rendered
    const avatar = screen.getByText('T');
    expect(avatar).toBeInTheDocument();
  });

  it('displays correct cart items count', () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        cart: { cartItems: [{ id: 1 }, { id: 2 }] }
      }
    });
    
    // Check that the cart badge shows correct count
    const badge = screen.getByTestId('cart-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('2');
  });

  it('navigates to search page when search icon is clicked', () => {
    renderWithProviders(<Navbar />);
    
    // Find and click the search button
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    
    // Verify navigation was called with correct route
    expect(navigateMock).toHaveBeenCalledWith('/search');
  });

  it('navigates to cart page when cart icon is clicked', () => {
    renderWithProviders(<Navbar />);
    
    // Find and click the cart button
    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);
    
    // Verify navigation was called with correct route
    expect(navigateMock).toHaveBeenCalledWith('/cart');
  });

  it('navigates to home page when logo is clicked', () => {
    renderWithProviders(<Navbar />);
    
    // Find and click the logo
    const logo = screen.getByTestId('navbar-logo');
    fireEvent.click(logo);
    
    // Verify navigation was called with correct route
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('navigates to login page when login button is clicked', () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: { user: null }
      }
    });
    
    // Find and click the login button
    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);
    
    // Verify navigation was called with correct route
    expect(navigateMock).toHaveBeenCalledWith('/account/login');
  });

  it('navigates to profile page when user avatar is clicked', () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: { 
          user: { username: 'testuser' } 
        }
      }
    });
    
    // Find and click the user avatar
    const avatar = screen.getByTestId('user-avatar');
    fireEvent.click(avatar);
    
    // Verify navigation was called with correct route
    expect(navigateMock).toHaveBeenCalledWith('/my-profile');
  });

  it('displays admin link for restaurant owner users', () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: { 
          user: { 
            username: 'adminuser',
            roles: ['ROLE_RESTAURANT_OWNER'] 
          } 
        }
      }
    });
    
    // Check that the admin button is shown
    const adminButton = screen.getByTestId('admin-button');
    expect(adminButton).toBeInTheDocument();
    expect(adminButton).toHaveTextContent('My Restaurant');
    
    // Test navigation when clicked
    fireEvent.click(adminButton);
    expect(navigateMock).toHaveBeenCalledWith('/admin/restaurant');
  });
  
  it('displays both admin links for super admin users', () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: { 
          user: { 
            username: 'superadmin',
            roles: ['ROLE_ADMIN'] 
          } 
        }
      }
    });
    
    // Check that both admin buttons are shown
    const adminButton = screen.getByTestId('admin-button');
    const superAdminButton = screen.getByTestId('super-admin-button');
    
    expect(adminButton).toBeInTheDocument();
    expect(superAdminButton).toBeInTheDocument();
    
    // Test navigation when super admin button is clicked
    fireEvent.click(superAdminButton);
    expect(navigateMock).toHaveBeenCalledWith('/super-admin');
  });
  
  it('does not display admin links for regular users', () => {
    renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: { 
          user: { 
            username: 'regularuser',
            roles: ['ROLE_USER'] 
          } 
        }
      }
    });
    
    // Check that admin buttons are not shown
    expect(screen.queryByTestId('admin-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('super-admin-button')).not.toBeInTheDocument();
  });
});