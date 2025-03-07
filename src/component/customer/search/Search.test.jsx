import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import Search from './Search';
import * as menuActions from '../../../redux/actions/menuActions';

// Mock the topMeels data
vi.mock('../../../data/topMeals', () => ({
  topMeels: [
    { image: 'pizza.jpg', title: 'Pizza' },
    { image: 'burger.jpg', title: 'Burger' },
    { image: 'pasta.jpg', title: 'Pasta' }
  ]
}));

// Mock the PopularCuisines component
vi.mock('./PopularCuisines', () => ({
  PopularCuisines: ({image, title}) => (
    <div data-testid={`mock-cuisine-${title.toLowerCase()}`}>
      {title}
    </div>
  )
}));

// Mock the SearchDishCard component
vi.mock('./SearchDishCard', () => ({
  default: ({item}) => (
    <div data-testid={`mock-dish-card-${item.foodId}`}>
      {item.name}
    </div>
  )
}));

// Mock the menu actions
vi.mock('../../../redux/actions/menuActions', async () => {
  const actual = await vi.importActual('../../../redux/actions/menuActions');
  return {
    ...actual,
    searchMenuItem: vi.fn(() => ({ type: 'MOCK_SEARCH_MENU_ITEM' }))
  };
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'mock-jwt-token'),
  },
  writable: true
});

describe('Search component', () => {
  it('renders search input and popular cuisines', () => {
    renderWithProviders(<Search />);
    
    // Check search container renders
    expect(screen.getByTestId('search-container')).toBeInTheDocument();
    
    // Check search input
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    
    // Check popular cuisines section
    expect(screen.getByTestId('popular-cuisines-title')).toHaveTextContent('Popular Cuisines');
    expect(screen.getByTestId('popular-cuisines-container')).toBeInTheDocument();
    
    // Check mocked cuisine items
    expect(screen.getByTestId('mock-cuisine-pizza')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cuisine-burger')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cuisine-pasta')).toBeInTheDocument();
  });

  it('dispatches search action when input changes', () => {
    renderWithProviders(<Search />);
    
    // Type in search input
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'pizza' } });
    
    // Check search action was called with correct params
    expect(menuActions.searchMenuItem).toHaveBeenCalledWith({
      keyword: 'pizza',
      jwt: 'mock-jwt-token'
    });
  });

  it('renders search results', () => {
    const mockSearchResults = [
      { foodId: 'food1', name: 'Margherita Pizza', price: 10 },
      { foodId: 'food2', name: 'Pepperoni Pizza', price: 12 }
    ];
    
    renderWithProviders(<Search />, {
      preloadedState: {
        menu: {
          search: mockSearchResults
        }
      }
    });
    
    // Check search results container
    expect(screen.getByTestId('search-results-container')).toBeInTheDocument();
    
    // Check mocked result cards
    expect(screen.getByTestId('mock-dish-card-food1')).toBeInTheDocument();
    expect(screen.getByTestId('mock-dish-card-food2')).toBeInTheDocument();
  });
});