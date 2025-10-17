import React from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { ToolCard } from '@/components/ToolCard';

const FavoriteToolsPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Favorite Tools</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">
            No favorite tools yet. Click the ⭐ on a tool to save it here.
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoriteToolsPage;
