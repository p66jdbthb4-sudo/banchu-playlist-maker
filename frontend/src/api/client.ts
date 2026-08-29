import { Video } from '../types';

const API_BASE_URL = '/api';

export const searchVideos = async (query: string): Promise<Video[]> => {
  const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('検索に失敗しました');
  }
  const data = await response.json();
  return data.data;
};

export const organizePlaylist = async (
  videos: Video[],
  mode: 'everyone' | 'premium',
) => {
  const response = await fetch(`${API_BASE_URL}/organize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videos, mode }),
  });
  if (!response.ok) {
    throw new Error('プレイリスト編成に失敗しました');
  }
  const data = await response.json();
  return data.data;
};
