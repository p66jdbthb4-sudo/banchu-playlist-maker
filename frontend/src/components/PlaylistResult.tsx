import React, { useState } from 'react';
import { Playlist } from '../types';
import { formatDurationLong, getYouTubeVideoUrl } from '../utils/formatter';

interface PlaylistResultProps {
  playlist: Playlist;
}

export const PlaylistResult: React.FC<PlaylistResultProps> = ({ playlist }) => {
  const [videos, setVideos] = useState(playlist.videos);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newVideos = [...videos];
    [newVideos[index], newVideos[index - 1]] = [
      newVideos[index - 1],
      newVideos[index],
    ];
    // order 番号を更新
    newVideos.forEach((v, i) => (v.order = i + 1));
    setVideos(newVideos);
  };

  const moveDown = (index: number) => {
    if (index === videos.length - 1) return;
    const newVideos = [...videos];
    [newVideos[index], newVideos[index + 1]] = [
      newVideos[index + 1],
      newVideos[index],
    ];
    newVideos.forEach((v, i) => (v.order = i + 1));
    setVideos(newVideos);
  };

  return (
    <div className="bg-white p-4 shadow mb-4">
      <h2 className="text-lg font-semibold mb-4">
        📽️ 完成した再生リスト
      </h2>
      <div className="space-y-2">
        {videos.map((video, index) => (
          <div key={video.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            {/* 順位 */}
            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {video.order}
            </div>

            {/* サムネイル */}
            <div className="flex-shrink-0 w-20 aspect-video bg-gray-200 rounded overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 情報 */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
              <p className="text-xs text-gray-600">
                {formatDurationLong(video.duration)} • {video.videoType}
              </p>
            </div>

            {/* 上下移動ボタン */}
            <div className="flex-shrink-0 flex flex-col gap-1">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400 disabled:opacity-50"
              >
                ↑
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === videos.length - 1}
                className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400 disabled:opacity-50"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* URL一覧コピーボタン */}
      <button
        onClick={() => {
          const urls = videos
            .map((v, i) => `${i + 1}. ${getYouTubeVideoUrl(v.id)}`)
            .join('\n');
          navigator.clipboard.writeText(urls);
          alert('URLリストをコピーしました！');
        }}
        className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        📋 URL一覧をコピー
      </button>
    </div>
  );
};
