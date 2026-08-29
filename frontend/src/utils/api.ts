/**
 * バックエンドAPI通信ユーティリティ
 */

import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
import { Video, YouTubeSearchResponse, Playlist, AppState } from '../types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * YouTube検索
 * @param query 検索キーワード
 * @returns 検索結果の動画リスト
 */
export async function searchYouTubeVideos(query: string): Promise<Video[]> {
  try {
    const response = await apiClient.post<YouTubeSearchResponse>(
      API_ENDPOINTS.SEARCH_VIDEOS,
      { query }
    );
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || '検索に失敗しました');
    }
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('YouTube検索に失敗しました。時間をおいて再度お試しください。');
  }
}

/**
 * プレイリストの自動編成
 * @param selectedVideos ユーザーが選択した動画リスト
 * @param mode プレミアム用 or 全員用
 * @returns 編成されたプレイリスト
 */
export async function organizePlaylist(
  selectedVideos: Video[],
  mode: 'premium' | 'everyone'
): Promise<Playlist> {
  try {
    const response = await apiClient.post<Playlist>(
      API_ENDPOINTS.ORGANIZE_PLAYLIST,
      {
        videos: selectedVideos,
        mode,
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Organize error:', error);
    throw new Error('プレイリストの自動編成に失敗しました。');
  }
}

/**
 * APIエラーハンドリング
 */
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 認証エラー
      console.error('認証エラー');
    } else if (error.response?.status === 500) {
      // サーバーエラー
      console.error('サーバーエラー');
    }
    return Promise.reject(error);
  }
);
