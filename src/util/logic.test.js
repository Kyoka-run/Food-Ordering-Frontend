import { describe, it, expect } from 'vitest';
import { isPresentInFavorites } from './logic';

describe('Logic utility functions', () => {
  describe('isPresentInFavorites', () => {
    // Test when restaurant is in favorites
    it('should return true when restaurant is in favorites', () => {
      const mockFavorites = [
        { restaurantId: 1, name: 'Restaurant A' },
        { restaurantId: 2, name: 'Restaurant B' }
      ];
      const mockRestaurant = { restaurantId: 1, name: 'Restaurant A' };
      
      expect(isPresentInFavorites(mockFavorites, mockRestaurant)).toBe(true);
    });

    // Test when restaurant is not in favorites
    it('should return false when restaurant is not in favorites', () => {
      const mockFavorites = [
        { restaurantId: 1, name: 'Restaurant A' },
        { restaurantId: 2, name: 'Restaurant B' }
      ];
      const mockRestaurant = { restaurantId: 3, name: 'Restaurant C' };
      
      expect(isPresentInFavorites(mockFavorites, mockRestaurant)).toBe(false);
    });

    // Test with empty favorites array
    it('should return false with empty favorites array', () => {
      const mockFavorites = [];
      const mockRestaurant = { restaurantId: 1, name: 'Restaurant A' };
      
      expect(isPresentInFavorites(mockFavorites, mockRestaurant)).toBe(false);
    });

    // Test with null or undefined inputs
    it('should handle null or undefined inputs', () => {
      expect(isPresentInFavorites(null, { restaurantId: 1 })).toBe(false);
      expect(isPresentInFavorites(undefined, { restaurantId: 1 })).toBe(false);
      expect(isPresentInFavorites([], null)).toBe(false);
      expect(isPresentInFavorites([], undefined)).toBe(false);
    });

    // Test with non-array favorites
    it('should handle non-array favorites', () => {
      expect(isPresentInFavorites({}, { restaurantId: 1 })).toBe(false);
      expect(isPresentInFavorites('not an array', { restaurantId: 1 })).toBe(false);
    });
  });
});