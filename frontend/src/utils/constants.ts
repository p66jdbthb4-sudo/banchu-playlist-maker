/**
 * アプリケーション全体で使用する定数
 */

// === ルール関連の定数 ===

/** 3時間（秒単位） */
export const MAX_PLAYLIST_DURATION = 3 * 60 * 60; // 10800秒

/** バンチューブ最大本数 */
export const MAX_BANCHUBE_COUNT = 6;

/** バンチューブ間隔の最小時間（秒）：5分5秒 */
export const MIN_SPACING_BETWEEN_BANCHUBE = 305; // 5分5秒

// === 動画タイプの定義 ===

export const VIDEO_TYPES = {
  BANCHUBE: 'banchube',
  MV: 'mv',
  NORMAL: 'normal',
  SHORTS: 'shorts',
  SHORT: 'short',
} as const;

export const VIDEO_TYPE_LABELS: Record<string, string> = {
  banchube: 'バンチューブ',
  mv: 'MV / ♪動画',
  normal: '通常動画',
  shorts: 'Shorts',
  short: '短い動画',
};

// === モードの定義 ===

export const MODES = {
  PREMIUM: 'premium',
  EVERYONE: 'everyone',
} as const;

export const MODE_LABELS: Record<string, string> = {
  premium: 'プレミアム用',
  everyone: '全員用',
};

// === API設定 ===

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const API_ENDPOINTS = {
  SEARCH_VIDEOS: '/api/youtube/search',
  ORGANIZE_PLAYLIST: '/api/playlist/organize',
} as const;

// === UI設定 ===

export const DEFAULT_THUMBNAIL_WIDTH = 120;
export const DEFAULT_THUMBNAIL_HEIGHT = 90;

// === 短めの動画の定義（秒未満） ===
// 最初と最後に優先する動画の最大時間
export const SHORT_VIDEO_MAX_DURATION = 300; // 5分
