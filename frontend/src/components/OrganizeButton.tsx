import React from 'react';
import { useAppContext } from '../context/AppContext';
import { organizePlaylist } from '../utils/api';

export const OrganizeButton: React.FC = () => {
  const { selectedVideos, mode, setPlaylist, setIsOrganizing, setError, isOrganizing } =
    useAppContext();

  const handleOrganize = async () => {
    if (!mode) {
      setError('モードを選択してください');
      return;
    }

    if (selectedVideos.length < 2) {
      setError('2本以上の動画を選択してください');
      return;
    }

    setIsOrganizing(true);
    setError(null);

    try {
      const playlist = await organizePlaylist(selectedVideos, mode);
      setPlaylist(playlist);
    } catch (err) {
      setError(err instanceof Error ? err.message : '自動編成に失敗しました');
      setPlaylist(null);
    } finally {
      setIsOrganizing(false);
    }
  };

  const isDisabled =
    !mode || selectedVideos.length < 2 || isOrganizing;

  return (
    <div className="bg-white p-4 shadow mb-4">
      <button
        onClick={handleOrganize}
        disabled={isDisabled}
        className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
          isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
        }`}
      >
        {isOrganizing ? '⏳ 自動編成中...' : '✨ ルールに沿って自動編成'}
      </button>
    </div>
  );
};
