import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { VideoList } from './components/VideoList';
import { PlaylistViewer } from './components/PlaylistViewer';
import { Video, Playlist } from './types';
import { organizePlaylist } from './api/client';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set());
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [mode, setMode] = useState<'everyone' | 'premium'>('everyone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchComplete = (newVideos: Video[]) => {
    setVideos(newVideos);
    setSelectedVideos(new Set());
    setPlaylist(null);
  };

  const handleOrganize = async () => {
    if (selectedVideos.size === 0) {
      setError('少なくとも1つの動画を選択してください');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      const videosToOrganize = Array.from(selectedVideos).map(
        (id) => videos.find((v) => v.id === id)!,
      );
      const newPlaylist = await organizePlaylist(videosToOrganize, mode);
      setPlaylist(newPlaylist);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">🎵 B&ZAI Playlist Maker</h1>
          <p className="text-xl text-gray-600">YouTube動画から最適なプレイリストを自動編成</p>
        </div>

        {/* メインコンテンツ */}
        {!playlist ? (
          <div className="space-y-8">
            {/* 検索フォーム */}
            <SearchForm
              onSearchComplete={handleSearchComplete}
              isLoading={isLoading}
              onLoadingChange={setIsLoading}
            />

            {/* 動画リスト */}
            {videos.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <VideoList
                  videos={videos}
                  selectedVideos={selectedVideos}
                  onSelectionChange={(selected) => setSelectedVideos(new Set(selected.map((v) => v.id)))}
                />
              </div>
            )}

            {/* コントロールパネル */}
            {videos.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">プレイリストモード</p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="everyone"
                          checked={mode === 'everyone'}
                          onChange={(e) => setMode(e.target.value as 'everyone' | 'premium')}
                          className="cursor-pointer"
                        />
                        <span>全員用</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="premium"
                          checked={mode === 'premium'}
                          onChange={(e) => setMode(e.target.value as 'everyone' | 'premium')}
                          className="cursor-pointer"
                        />
                        <span>プレミアム用</span>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={handleOrganize}
                    disabled={selectedVideos.size === 0 || isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isLoading ? 'プレイリスト編成中...' : 'プレイリストを編成'}
                  </button>
                </div>
                {selectedVideos.size > 0 && (
                  <p className="text-sm text-gray-600 mt-4">{selectedVideos.size}個の動画が選択されています</p>
                )}
              </div>
            )}

            {/* エラーメッセージ */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* プレイリストビューア */}
            <PlaylistViewer playlist={playlist} />

            {/* 戻るボタン */}
            <div className="flex justify-center">
              <button
                onClick={() => setPlaylist(null)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                ← 戻る
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
