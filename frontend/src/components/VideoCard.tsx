import React from 'react';
import { Video } from '../types';
import { formatDuration, getYouTubeThumbnailUrl } from '../utils/formatter';
import { useAppContext } from '../context/AppContext';

interface VideoCardProps {
  video: Video;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
  onVideoTypeChange?: (type: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  showAddButton = false,
  showRemoveButton = false,
  onVideoTypeChange,
}) => {
  const { addSelectedVideo, removeSelectedVideo } = useAppContext();

  const handleAdd = () => {
    addSelectedVideo(video);
  };

  const handleRemove = () => {
    removeSelectedVideo(video.id);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
      {/* サムネイル */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden">
        <img
          src={getYouTubeThumbnailUrl(video.id)}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* 情報 */}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h3>
        <p className="text-xs text-gray-600 mb-3">{video.channelName}</p>

        {/* ボタン */}
        <div className="flex gap-2">
          {showAddButton && (
            <button
              onClick={handleAdd}
              className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              ➕ 追加
            </button>
          )}
          {showRemoveButton && (
            <button
              onClick={handleRemove}
              className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              🗑️ 削除
            </button>
          )}
          {onVideoTypeChange && (
            <select
              value={video.videoType}
              onChange={(e) => onVideoTypeChange(e.target.value)}
              className="flex-1 px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="banchube">バンチューブ</option>
              <option value="mv">MV / ♪動画</option>
              <option value="normal">通常動画</option>
              <option value="shorts">Shorts</option>
              <option value="short">短い動画</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
};
