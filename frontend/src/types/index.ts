export interface Video {
  id: string;
  title: string;
  channelName: string;
  duration: number;
  videoType: 'banchube' | 'mv' | 'normal' | 'shorts' | 'short';
  order?: number;
}

export interface PlaylistValidation {
  isValid: boolean;
  totalDuration: number;
  banchubeCount: number;
  errors: Array<{ code: string; message: string }>;
  warnings?: string[];
}

export interface Playlist {
  videos: Video[];
  mode: 'everyone' | 'premium';
  validation: PlaylistValidation;
  createdAt: string;
}
