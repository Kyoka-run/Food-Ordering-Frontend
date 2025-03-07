import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../util/test-utils';
import { PopularCuisines } from './PopularCuisines';
import * as menuActions from '../../../redux/actions/menuActions';

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

describe('PopularCuisines', () => {
  const mockProps = {
    title: 'Pizza',
    image: 'pizza.jpg'
  };

  it('renders cuisine correctly', () => {
    renderWithProviders(<PopularCuisines {...mockProps} />);
    
    // Check item is rendered
    expect(screen.getByTestId(`cuisine-item-${mockProps.title.toLowerCase()}`)).toBeInTheDocument();
    
    // Check cuisine details
    expect(screen.getByTestId(`cuisine-title-${mockProps.title.toLowerCase()}`)).toHaveTextContent(mockProps.title);
    
    // Check image
    const image = screen.getByTestId(`cuisine-image-${mockProps.title.toLowerCase()}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProps.image);
    expect(image).toHaveAttribute('alt', mockProps.title);
  });

  it('truncates long titles', () => {
    const longTitleProps = {
      title: 'Very Long Cuisine Name',
      image: 'cuisine.jpg'
    };
    
    renderWithProviders(<PopularCuisines {...longTitleProps} />);
    
    const titleElement = screen.getByTestId(`cuisine-title-${longTitleProps.title.toLowerCase()}`);
    expect(titleElement).toHaveTextContent('Very Lo...');
  });

  it('dispatches search action when clicked', () => {
    renderWithProviders(<PopularCuisines {...mockProps} />);
    
    // Click the cuisine item
    fireEvent.click(screen.getByTestId(`cuisine-item-${mockProps.title.toLowerCase()}`));
    
    // Check search action was called with correct params
    expect(menuActions.searchMenuItem).toHaveBeenCalledWith({
      keyword: mockProps.title,
      jwt: 'mock-jwt-token'
    });
  });
});