import express, { Request, Response } from 'express';
import { organizeVideos } from '../utils/organizer.js';
import { Video } from '../types/index.js';

export const organizeRoute = express.Router();

interface OrganizeRequest {
  videos: Video[];
  mode: 'everyone' | 'premium';
}

organizeRoute.post('/organize', async (req: Request<{}, {}, OrganizeRequest>, res: Response) => {
  try {
    const { videos, mode } = req.body;

    if (!videos || !Array.isArray(videos) || videos.length === 0) {
      return res.status(400).json({ error: '動画リストが必要です' });
    }

    if (!mode || (mode !== 'everyone' && mode !== 'premium')) {
      return res.status(400).json({ error: 'モード（everyone または premium）が必要です' });
    }

    const playlist = organizeVideos(videos, mode);
    res.json({ success: true, data: playlist });
  } catch (error) {
    console.error('Organize error:', error);
    res.status(500).json({
      error: '編成に失敗しました',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
