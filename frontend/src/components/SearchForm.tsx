import { useState } from 'react';
import { Video } from '../types';
import { searchVideos } from '../api/client';

interface SearchFormProps {
  onSearchComplete: (videos: Video[]) => void;
  isLoading: boolean;
  onLoadingChange: (loading: boolean) => void;
}

export const SearchForm = ({ onSearchComplete, isLoading, onLoadingChange }: SearchFormProps) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('検索キーワードを入力してください');
      return;
    }

    try {
      setError(null);
      onLoadingChange(true);
      const videos = await searchVideos(query);
      onSearchComplete(videos);
      setQuery('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索に失敗しました');
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="動画のタイトルやチャンネル名を入力..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
        >
          {isLoading ? '検索中...' : '検索'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};
