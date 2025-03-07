import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import MenuItemTable from './MenuItemTable';
import * as reactRouterDom from 'react-router-dom';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

const navigateMock = vi.fn();

describe('MenuItemTable', () => {
  const mockMenuItems = [
    {
      foodId: 'food1',
      name: 'Pizza',
      description: 'Delicious pizza',
      price: 10.99,
      image: 'pizza.jpg',
      available: true,
      ingredients: [
        { ingredientsItemId: 'ing1', name: 'Tomato' },
        { ingredientsItemId: 'ing2', name: 'Cheese' }
      ]
    },
    {
      foodId: 'food2',
      name: 'Pasta',
      description: 'Tasty pasta',
      price: 8.99,
      image: 'pasta.jpg',
      available: false,
      ingredients: [
        { ingredientsItemId: 'ing3', name: 'Flour' }
      ]
    }
  ];

  it('renders menu items correctly', () => {
    renderWithProviders(
      <MenuItemTable />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          menu: {
            menuItems: mockMenuItems,
            loading: false
          }
        }
      }
    );
    
    // Check that both menu items are rendered
    expect(screen.getByTestId(`menu-item-row-${mockMenuItems[0].foodId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`menu-item-row-${mockMenuItems[1].foodId}`)).toBeInTheDocument();
    
    // Check item details
    expect(screen.getByTestId(`menu-item-name-${mockMenuItems[0].foodId}`)).toHaveTextContent('Pizza');
    expect(screen.getByTestId(`menu-item-price-${mockMenuItems[0].foodId}`)).toHaveTextContent('€10.99');
    expect(screen.getByTestId(`menu-item-availability-${mockMenuItems[0].foodId}`)).toHaveTextContent('in stock');
    expect(screen.getByTestId(`menu-item-availability-${mockMenuItems[1].foodId}`)).toHaveTextContent('out of stock');
  });

  it('displays empty message when no menu items exist', () => {
    renderWithProviders(
      <MenuItemTable />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          menu: {
            menuItems: [],
            loading: false
          }
        }
      }
    );
    
    expect(screen.getByTestId('no-items-message')).toBeInTheDocument();
  });

  it('navigates to add menu page when add button is clicked', () => {
    renderWithProviders(
      <MenuItemTable />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          menu: {
            menuItems: mockMenuItems,
            loading: false
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId('add-menu-item-button'));
    expect(navigateMock).toHaveBeenCalledWith('/admin/restaurant/add-menu');
  });

  it('navigates to edit page when edit button is clicked', () => {
    renderWithProviders(
      <MenuItemTable />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          menu: {
            menuItems: mockMenuItems,
            loading: false
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId(`edit-button-${mockMenuItems[0].foodId}`));
    expect(navigateMock).toHaveBeenCalledWith(`/admin/restaurant/menu/update/${mockMenuItems[0].foodId}`);
  });

  it('renders in dashboard mode without ingredient column', () => {
    renderWithProviders(
      <MenuItemTable isDashboard={true} name="Dashboard Menu" />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' }
          },
          menu: {
            menuItems: mockMenuItems,
            loading: false
          }
        }
      }
    );
    
    // Card header should have the provided name
    expect(screen.getByTestId('card-header')).toHaveTextContent('Dashboard Menu');
    
    // Ingredients column and action column should not be present
    expect(screen.queryByTestId(`menu-item-ingredients-${mockMenuItems[0].foodId}`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`edit-button-${mockMenuItems[0].foodId}`)).not.toBeInTheDocument();
  });
});