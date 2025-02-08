export const isPresentInFavorites = (favorites = [], restaurant) => {
  if (!Array.isArray(favorites) || !restaurant) return false;
  return favorites.some(item => item.restaurantId === restaurant.restaurantId);
}