/**
 * データフォーマット・変換ユーティリティ
 */

/**
 * 秒をMM:SSフォーマットに変換
 * @param seconds 秒数
 * @returns "5:30" のような形式
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * MM:SS または HH:MM:SS 形式の文字列を秒に変換
 * @param timeString "5:30" or "1:30:45"
 * @returns 秒数
 */
export function parseTimeString(timeString: string): number {
  const parts = timeString.split(':').map(Number);
  
  if (parts.length === 2) {
    // MM:SS
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    // HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  
  return 0;
}

/**
 * 秒を HH:MM:SS フォーマットに変換
 * @param seconds 秒数
 * @returns "1:05:30" のような形式
 */
export function formatDurationLong(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

/**
 * 合計時間を「X時間Y分」形式に変換
 * @param seconds 秒数
 * @returns "1時間5分" のような形式
 */
export function formatDurationJapanese(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}時間${minutes}分`;
  } else {
    return `${minutes}分`;
  }
}

/**
 * YouTube動画IDからサムネイルURLを生成
 * @param videoId YouTube動画ID
 * @returns サムネイルURL
 */
export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

/**
 * YouTube動画IDから動画URLを生成
 * @param videoId YouTube動画ID
 * @returns 動画URL
 */
export function getYouTubeVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
