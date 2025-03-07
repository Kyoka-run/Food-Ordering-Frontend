import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import RestaurantsMenu from './RestaurantsMenu';

describe('RestaurantsMenu', () => {
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

  it('displays menu items correctly', () => {
    renderWithProviders(
      <RestaurantsMenu />,
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
    
    expect(screen.getByTestId('restaurants-menu-container')).toBeInTheDocument();
    expect(screen.getByTestId('menu-items-table')).toBeInTheDocument();
    
    // Check that both menu items are rendered
    expect(screen.getByTestId(`menu-item-row-${mockMenuItems[0].foodId}`)).toBeInTheDocument();
    expect(screen.getByTestId(`menu-item-row-${mockMenuItems[1].foodId}`)).toBeInTheDocument();
    
    // Check item details
    expect(screen.getByTestId(`menu-item-name-${mockMenuItems[0].foodId}`)).toHaveTextContent('Pizza');
    expect(screen.getByTestId(`menu-item-price-${mockMenuItems[0].foodId}`)).toHaveTextContent('€10.99');
  });

  it('displays empty state when no menu items exist', () => {
    renderWithProviders(
      <RestaurantsMenu />,
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
    
    expect(screen.getByTestId('no-menu-items-message')).toBeInTheDocument();
  });

  it('opens modal when add button is clicked', () => {
    renderWithProviders(
      <RestaurantsMenu />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' },
            categories: []
          },
          menu: {
            menuItems: mockMenuItems,
            loading: false
          },
          ingredients: {
            ingredients: []
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId('add-menu-item-button'));
    
    expect(screen.getByTestId('menu-item-modal')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-form')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent('Create Menu Item');
  });

  it('opens modal with menu item data when edit button is clicked', () => {
    renderWithProviders(
      <RestaurantsMenu />,
      {
        preloadedState: {
          restaurant: {
            usersRestaurant: { restaurantId: 'rest123' },
            categories: []
          },
          menu: {
            menuItems: mockMenuItems,
            loading: false
          },
          ingredients: {
            ingredients: []
          }
        }
      }
    );
    
    fireEvent.click(screen.getByTestId(`edit-button-${mockMenuItems[0].foodId}`));
    
    expect(screen.getByTestId('menu-item-modal')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toHaveTextContent('Update Menu Item');
    expect(screen.getByTestId('menu-item-name-input')).toHaveValue('Pizza');
  });

  it('opens delete confirmation dialog when delete button is clicked', () => {
    renderWithProviders(
      <RestaurantsMenu />,
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
    
    fireEvent.click(screen.getByTestId(`delete-button-${mockMenuItems[0].foodId}`));
    
    // Check that delete dialog is shown with item name
    expect(screen.getByTestId('delete-confirmation-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('item-name')).toHaveTextContent('Pizza');
  });
});