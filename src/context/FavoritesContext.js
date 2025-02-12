import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.sub}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, [isAuthenticated, user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`favorites_${user.sub}`, JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user]);

  const addToFavorites = (book) => {
    setFavorites(prev => [...prev, book]);
  };

  const removeFromFavorites = (book) => {
    setFavorites(prev => prev.filter(b => b.title !== book.title));
  };

  const isFavorite = (book) => {
    return favorites.some(b => b.title === book.title);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
} 