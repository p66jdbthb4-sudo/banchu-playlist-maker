/**
 * YouTube Data API から取得する動画情報
 */
export type Video = {
  id: string;                    // YouTube動画ID
  title: string;                 // タイトル
  thumbnailUrl: string;          // サムネイルURL
  duration: number;              // 再生時間（秒単位）
  channelName: string;           // チャンネル名
  videoType: VideoType;          // 動画タイプ
};

/**
 * 動画タイプの分類
 */
export type VideoType = 
  | 'banchube'                   // バンチューブ
  | 'mv'                         // MV / ♪動画
  | 'normal'                     // 通常動画
  | 'shorts'                     // Shorts
  | 'short';                     // 短い動画

/**
 * ユーザーの再生リストモード
 */
export type Mode = 'premium' | 'everyone';

/**
 * プレイリスト内の動画（順位情報付き）
 */
export type PlaylistVideo = Video & {
  order: number;                 // 1位、2位...（1から始まる）
};

/**
 * 完成したプレイリスト
 */
export type Playlist = {
  mode: Mode;                    // プレミアム用 or 全員用
  videos: PlaylistVideo[];       // 順序付き動画リスト
  totalDuration: number;         // 合計時間（秒）
  validation: ValidationResult;  // ルール検証結果
};

/**
 * ルール違反のタイプ
 */
export type ValidationErrorType = 
  | 'duration'                   // 3時間超過
  | 'banchube_count'             // バンチューブ6本超過
  | 'spacing'                    // バンチューブ間隔不足（305秒未満）
  | 'insufficient_videos'        // 動画不足でルール満たせない
  | 'other';

/**
 * ルール違反情報
 */
export type ValidationError = {
  type: ValidationErrorType;
  message: string;               // 人間が読める説明
  details?: Record<string, any>; // 詳細情報
};

/**
 * ルール検証結果
 */
export type ValidationResult = {
  isValid: boolean;              // 全ルール満たしているか
  totalDuration: number;         // 合計時間（秒）
  banchubeCount: number;         // バンチューブ本数
  errors: ValidationError[];     // ルール違反リスト
  warnings?: string[];           // 警告メッセージ
};

/**
 * アプリケーション全体の状態
 */
export type AppState = {
  // 検索・選択
  searchQuery: string;
  searchResults: Video[];
  selectedVideos: Video[];
  
  // モード
  mode: Mode | null;
  
  // 完成リスト
  playlist: Playlist | null;
  
  // UI状態
  isLoading: boolean;
  error: string | null;
  isSearching: boolean;
  isOrganizing: boolean;
};

/**
 * YouTube API 検索レスポンス
 */
export type YouTubeSearchResponse = {
  success: boolean;
  data: Video[];
  error?: string;
};
