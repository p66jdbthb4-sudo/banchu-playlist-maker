import express, { Request, Response } from 'express';
import { searchYouTube } from '../utils/youtube.js';

export const searchRoute = express.Router();

searchRoute.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ 
        error: '検索キーワードが必要です',
        success: false
      });
    }

    if (q.trim().length === 0) {
      return res.status(400).json({ 
        error: '検索キーワードが空です',
        success: false
      });
    }

    const videos = await searchYouTube(q);
    res.json({ success: true, data: videos });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: '検索に失敗しました',
      message: error instanceof Error ? error.message : 'Unknown error',
      success: false
    });
  }
});
