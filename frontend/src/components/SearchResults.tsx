import React from 'react';
import { useAppContext } from '../context/AppContext';
import { VideoCard } from './VideoCard';

export const SearchResults: React.FC = () => {
  const { searchResults, isSearching } = useAppContext();

  if (isSearching) {
    return (
      <div className="bg-white p-4 shadow mb-4 text-center">
        <p className="text-gray-600">🔍 検索中...</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 shadow mb-4">
      <h2 className="text-lg font-semibold mb-4">検索結果</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {searchResults.map((video) => (
          <VideoCard key={video.id} video={video} showAddButton />
        ))}
      </div>
    </div>
  );
};
