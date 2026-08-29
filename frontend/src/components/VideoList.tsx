import { Video } from '../types';
import { useState } from 'react';

interface VideoListProps {
  videos: Video[];
  onSelectionChange: (selectedVideos: Video[]) => void;
  selectedVideos: Set<string>;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const getVideoTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    banchube: 'バンチューブ',
    mv: 'MV/♪',
    normal: '通常動画',
    shorts: 'Shorts',
    short: '短編',
  };
  return labels[type] || type;
};

const getVideoTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    banchube: 'bg-red-100 text-red-800',
    mv: 'bg-purple-100 text-purple-800',
    normal: 'bg-blue-100 text-blue-800',
    shorts: 'bg-yellow-100 text-yellow-800',
    short: 'bg-orange-100 text-orange-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

export const VideoList = ({ videos, onSelectionChange, selectedVideos }: VideoListProps) => {
  const toggleSelect = (videoId: string) => {
    const newSelected = new Set(selectedVideos);
    if (newSelected.has(videoId)) {
      newSelected.delete(videoId);
    } else {
      newSelected.add(videoId);
    }
    onSelectionChange(Array.from(newSelected).map((id) => videos.find((v) => v.id === id)!));
  };

  const toggleSelectAll = () => {
    if (selectedVideos.size === videos.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(videos);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">検索結果（{videos.length}件）</h3>
        <button
          onClick={toggleSelectAll}
          className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
        >
          {selectedVideos.size === videos.length ? 'すべて解除' : 'すべて選択'}
        </button>
      </div>

      <div className="space-y-2">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedVideos.has(video.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => toggleSelect(video.id)}
          >
            <div className="flex gap-4">
              <input
                type="checkbox"
                checked={selectedVideos.has(video.id)}
                onChange={() => {}}
                className="mt-1 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{video.title}</p>
                <p className="text-sm text-gray-600 mt-1">{video.channelName}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${getVideoTypeColor(video.videoType)}`}>
                    {getVideoTypeLabel(video.videoType)}
                  </span>
                  <span className="text-xs text-gray-500">{formatDuration(video.duration)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
