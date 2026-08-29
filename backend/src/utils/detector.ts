import { Video } from '../types/index.js';

const BANCHUBE_NAMES = [
  'バンチューブ',
  'banchube',
  'B&ZAI',
  'B&Zai',
  'banchu',
  'ばんちゅー',
];

const MV_KEYWORDS = ['MV', 'ミュージック', '♪', '歌', 'music video'];

export const detectVideoType = (title: string, duration: number): Video['videoType'] => {
  const lowerTitle = title.toLowerCase();

  // バンチューブ判定
  if (BANCHUBE_NAMES.some((name) => lowerTitle.includes(name.toLowerCase()))) {
    return 'banchube';
  }

  // MV判定
  if (MV_KEYWORDS.some((keyword) => lowerTitle.includes(keyword.toLowerCase()))) {
    return 'mv';
  }

  // Shorts判定
  if (lowerTitle.includes('shorts')) {
    return 'shorts';
  }

  // 短い動画判定（60秒以下）
  if (duration <= 60) {
    return 'short';
  }

  return 'normal';
};
