import { useState, useEffect } from 'react';

export interface FavoriteItem {
  id: string | number;
  title: string;
  slug: string;
}

const FAVORITES_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (data: FavoriteItem[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
    setFavorites(data);
  };

  const addFavorite = (item: FavoriteItem) => {
    const exists = favorites.some(fav => fav.id === item.id);
    if (!exists) {
      const updated = [...favorites, item];
      saveToLocalStorage(updated);
    }
  };

  const removeFavorite = (id: string | number) => {
    const updated = favorites.filter(fav => fav.id !== id);
    saveToLocalStorage(updated);
  };

  const isFavorite = (id: string | number) => {
    return favorites.some(fav => fav.id === id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
