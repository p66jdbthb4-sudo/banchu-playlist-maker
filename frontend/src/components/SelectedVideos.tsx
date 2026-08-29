import React from 'react';
import { useAppContext } from '../context/AppContext';
import { VideoCard } from './VideoCard';

export const SelectedVideos: React.FC = () => {
  const { selectedVideos, updateVideoType } = useAppContext();

  if (selectedVideos.length === 0) {
    return (
      <div className="bg-white p-4 shadow mb-4 text-center text-gray-500">
        <p>まだ動画が選択されていません</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow mb-4">
      <h2 className="text-lg font-semibold mb-4">
        選択中の動画 ({selectedVideos.length}件)
      </h2>
      <div className="space-y-3">
        {selectedVideos.map((video) => (
          <div key={video.id} className="flex gap-3">
            {/* サムネイル */}
            <div className="flex-shrink-0 w-24 aspect-video bg-gray-200 rounded overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 情報 */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1">{video.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{video.channelName}</p>

              {/* ドロップダウン */}
              <select
                value={video.videoType}
                onChange={(e) => updateVideoType(video.id, e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="banchube">バンチューブ</option>
                <option value="mv">MV / ♪動画</option>
                <option value="normal">通常動画</option>
                <option value="shorts">Shorts</option>
                <option value="short">短い動画</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
