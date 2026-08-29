import React from 'react';
import { useAppContext } from '../context/AppContext';
import { searchYouTubeVideos } from '../utils/api';

export const SearchSection: React.FC = () => {
  const { searchQuery, setSearchQuery, setSearchResults, setIsSearching, setError } =
    useAppContext();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('検索キーワードを入力してください');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const results = await searchYouTubeVideos(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索に失敗しました');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white p-4 shadow mb-4">
      <h2 className="text-lg font-semibold mb-4">YouTube検索</h2>
      <form onSubmit={handleSearch}>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="B&ZAI バンチューブなど..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            🔍 検索
          </button>
        </div>
      </form>
    </div>
  );
};
