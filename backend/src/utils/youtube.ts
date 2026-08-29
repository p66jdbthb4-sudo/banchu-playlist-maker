import axios from 'axios';
import { Video } from '../types/index.js';

interface YouTubeSearchResult {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
  };
}

interface YouTubeVideoDetail {
  id: string;
  snippet: { title: string; channelTitle: string };
  contentDetails: { duration: string };
}

// ISO 8601 時間形式をシ秒に変換
const parseDuration = (duration: string): number => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  let seconds = 0;

  if (match) {
    if (match[1]) seconds += parseInt(match[1]) * 3600;
    if (match[2]) seconds += parseInt(match[2]) * 60;
    if (match[3]) seconds += parseInt(match[3]);
  }

  return seconds;
};

// YouTube検索（youtube-sr ライブラリを使用する場合）
export const searchYouTube = async (query: string): Promise<Video[]> => {
  try {
    // youtube-sr ライブラリの使用
    const { search } = await import('youtube-sr');
    const results = await search(query, { limit: 20 });

    const videos: Video[] = results
      .filter((result: any) => result.type === 'video')
      .map((result: any) => ({
        id: result.id,
        title: result.title,
        channelName: result.channel?.name || 'Unknown',
        duration: result.duration || 0,
        videoType: 'normal', // 後で detectVideoType で更新される
      }));

    return videos;
  } catch (error) {
    console.error('YouTube search error:', error);
    throw new Error('YouTube検索に失敗しました');
  }
};
