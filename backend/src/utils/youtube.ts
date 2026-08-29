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

// サンプルデータ：YouTube APIキーがない��合のテスト用
const generateSampleData = (query: string): Video[] => {
  const sampleVideos: Video[] = [
    {
      id: 'sample_1',
      title: `【バンチューブ】${query}特集`,
      channelName: 'バンチューブ公式',
      duration: 480, // 8分
      videoType: 'banchube',
    },
    {
      id: 'sample_2',
      title: `${query} - MV【公式】`,
      channelName: 'Music Official',
      duration: 240, // 4分
      videoType: 'mv',
    },
    {
      id: 'sample_3',
      title: `${query}について語る【解説動画】`,
      channelName: 'ミュージック解説ch',
      duration: 720, // 12分
      videoType: 'normal',
    },
    {
      id: 'sample_4',
      title: `${query} | Shorts`,
      channelName: 'Music Shorts',
      duration: 45, // 45秒
      videoType: 'shorts',
    },
    {
      id: 'sample_5',
      title: `【バンチューブ】${query}ランキング`,
      channelName: 'バンチューブ公式',
      duration: 600, // 10分
      videoType: 'banchube',
    },
    {
      id: 'sample_6',
      title: `${query}を歌ってみた`,
      channelName: 'シンガー太郎',
      duration: 300, // 5分
      videoType: 'normal',
    },
  ];

  return sampleVideos;
};

// YouTube検索��youtube-sr ライブラリを使用する場合）
export const searchYouTube = async (query: string): Promise<Video[]> => {
  // YouTube API キーが設定されていない場合、サンプルデータを返す
  const useYouTubeApi = process.env.YOUTUBE_API_KEY !== undefined && 
                        process.env.YOUTUBE_API_KEY !== '';

  if (!useYouTubeApi) {
    console.log('YouTube API key not configured, using sample data for testing');
    return generateSampleData(query);
  }

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
    // YouTube API 検索失敗時もサンプルデータにフォールバック
    console.log('YouTube search failed, falling back to sample data');
    return generateSampleData(query);
  }
};
