import React, { createContext, useState, useEffect, useContext } from 'react';
import { Tool } from '@/data/tools';

interface FavoritesContextType {
  favorites: Tool[];
  addFavorite: (tool: Tool) => void;
  removeFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Tool[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favoriteTools');
      if (storedFavorites) {
        try {
          const parsedFavorites = JSON.parse(storedFavorites);
          // Validate that parsedFavorites is an array
          if (Array.isArray(parsedFavorites)) {
            setFavorites(parsedFavorites);
          } else {
            console.warn('Stored favorites is not an array, resetting to empty array');
            setFavorites([]);
          }
        } catch (parseError) {
          console.error('Failed to parse favorite tools from localStorage:', parseError);
          localStorage.removeItem('favoriteTools'); // Remove corrupted data
          setFavorites([]);
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setFavorites([]);
    }
  }, []);

  const addFavorite = (tool: Tool) => {
    try {
      // Prevent duplicates
      if (!favorites.some(fav => fav.id === tool.id)) {
        const newFavorites = [...favorites, tool];
        setFavorites(newFavorites);
        localStorage.setItem('favoriteTools', JSON.stringify(newFavorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = (toolId: string) => {
    try {
      const newFavorites = favorites.filter(tool => tool.id !== toolId);
      setFavorites(newFavorites);
      localStorage.setItem('favoriteTools', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const isFavorite = (toolId: string) => {
    try {
      return favorites.some(tool => tool.id === toolId);
    } catch (error) {
      console.error('Error checking if tool is favorite:', error);
      return false;
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    // Instead of throwing an error, return a safe default context
    console.warn('useFavorites must be used within a FavoritesProvider');
    return {
      favorites: [],
      addFavorite: () => {},
      removeFavorite: () => {},
      isFavorite: () => false
    };
  }
  return context;
};