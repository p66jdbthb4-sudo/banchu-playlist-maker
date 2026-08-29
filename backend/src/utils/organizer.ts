import { Video, Playlist, Validation } from '../types/index.js';
import { detectVideoType } from './detector.js';

const MAX_PLAYLIST_DURATION = 3 * 60 * 60; // 3時間
const MAX_BANCHUBE_COUNT = 6;
const MIN_BANCHUBE_INTERVAL = 5 * 60; // 5分（300秒）

interface PlaylistItem extends Video {
  order: number;
}

export const organizeVideos = (
  videos: Video[],
  mode: 'everyone' | 'premium',
): Playlist => {
  // ビデオタイプを自動判定
  const typedVideos = videos.map((v) => ({
    ...v,
    videoType: detectVideoType(v.title, v.duration),
  }));

  // ビデオをタイプ別に分類
  const banchubVideos = typedVideos.filter((v) => v.videoType === 'banchube');
  const mvVideos = typedVideos.filter((v) => v.videoType === 'mv');
  const normalVideos = typedVideos.filter((v) => v.videoType === 'normal');
  const shortsVideos = typedVideos.filter(
    (v) => v.videoType === 'shorts' || v.videoType === 'short',
  );

  // プレイリスト編成ロジック
  const organizedVideos: PlaylistItem[] = [];

  if (mode === 'everyone') {
    // 全員用：MV/♪は最初に配置、その後バンチューブと通常動画を交互に配置
    organizedVideos.push(...mvVideos);
    organizedVideos.push(...shortsVideos);

    let order = 1;

    for (const video of organizedVideos) {
      video.order = order++;
    }

    // バンチューブと通常動画を交互に追加
    let bIdx = 0,
      nIdx = 0;
    while (bIdx < banchubVideos.length || nIdx < normalVideos.length) {
      if (bIdx < banchubVideos.length) {
        banchubVideos[bIdx].order = order++;
        organizedVideos.push(banchubVideos[bIdx]);
        bIdx++;
      }
      if (nIdx < normalVideos.length) {
        normalVideos[nIdx].order = order++;
        organizedVideos.push(normalVideos[nIdx]);
        nIdx++;
      }
    }
  } else {
    // プレミアム用：バンチューブ間にMVや通常動画を配置
    let order = 1;

    for (let i = 0; i < banchubVideos.length; i++) {
      banchubVideos[i].order = order++;
      organizedVideos.push(banchubVideos[i]);

      // バンチューブの後にMVや通常動画を挿入
      if (i < banchubVideos.length - 1) {
        if (mvVideos.length > 0) {
          const mv = mvVideos.shift()!;
          mv.order = order++;
          organizedVideos.push(mv);
        }
        if (normalVideos.length > 0) {
          const normal = normalVideos.shift()!;
          normal.order = order++;
          organizedVideos.push(normal);
        }
      }
    }

    // 残りの動画を追加
    organizedVideos.push(
      ...mvVideos.map((v, i) => ({ ...v, order: order + i })),
      ...normalVideos.map((v, i) => ({
        ...v,
        order: order + mvVideos.length + i,
      })),
      ...shortsVideos.map((v, i) => ({
        ...v,
        order: order + mvVideos.length + normalVideos.length + i,
      })),
    );
  }

  // ルール検証
  const validation = validatePlaylist(organizedVideos, mode);

  return {
    videos: organizedVideos,
    mode,
    validation,
    createdAt: new Date().toISOString(),
  };
};

const validatePlaylist = (
  videos: PlaylistItem[],
  mode: 'everyone' | 'premium',
): Validation => {
  const errors: Array<{ code: string; message: string }> = [];
  const warnings: string[] = [];

  // 合計時間計算
  const totalDuration = videos.reduce((sum, v) => sum + v.duration, 0);

  // バンチューブ本数
  const banchubeCount = videos.filter((v) => v.videoType === 'banchube').length;

  // ルール1: 3時間以内
  if (totalDuration > MAX_PLAYLIST_DURATION) {
    errors.push({
      code: 'DURATION_EXCEEDED',
      message: `再生時間が長すぎます（${formatDuration(totalDuration)}）。3時間以内にしてください。`,
    });
  }

  // ルール2: バンチューブ最大6本
  if (banchubeCount > MAX_BANCHUBE_COUNT) {
    errors.push({
      code: 'BANCHUBE_LIMIT_EXCEEDED',
      message: `バンチューブが多すぎます（${banchubeCount}本）。6本以下にしてください。`,
    });
  }

  // ルール3: バンチューブ間隔チェック
  let lastBanchubeIdx = -1;
  let lastBanchubeDuration = 0;

  for (let i = 0; i < videos.length; i++) {
    if (videos[i].videoType === 'banchube') {
      if (lastBanchubeIdx !== -1) {
        let timeBetween = 0;
        for (let j = lastBanchubeIdx + 1; j < i; j++) {
          timeBetween += videos[j].duration;
        }
        if (timeBetween < MIN_BANCHUBE_INTERVAL) {
          warnings.push(
            `${videos[lastBanchubeIdx].title} と ${videos[i].title} の間隔が短すぎます（${formatDuration(timeBetween)}）。5分以上の間隔を推奨します。`,
          );
        }
      }
      lastBanchubeIdx = i;
    }
  }

  const isValid = errors.length === 0;

  return {
    isValid,
    totalDuration,
    banchubeCount,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
};

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}時間${minutes}分${secs}秒`;
  }
  return `${minutes}分${secs}秒`;
};
